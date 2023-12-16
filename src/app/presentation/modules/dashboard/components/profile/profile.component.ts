import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/presentation/shared/global/modules/session-storage/services/session-storage.service';
import { UserInfo } from '../../interfaces/userInfo.interface';
import { ResponsePokeEntity } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-entity';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public hasLoad: boolean = true;
  public imgResource!: string;
  public userName!: string;
  public userHobbies!: string[];
  public userBirthday!: number;
  public document!: string;
  public dataSelectedPokemons!: ResponsePokeEntity[];

  constructor(
    private _sessionStorageService: SessionStorageService,
    public dialog: MatDialog,
    private _router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this._init();
    this.getColorsPokemons();
  }

  private async _init() {
    const selectedPokemons =
      this._sessionStorageService.getValue<ResponsePokeEntity[]>(
        'selectedPokemons'
      );

    this.dataSelectedPokemons = selectedPokemons!;

    const user = this._sessionStorageService.getValue<UserInfo>('userInfo');
    const image = this._sessionStorageService.getValue<string>('userImage');
    const hobbies =
      this._sessionStorageService.getValue<string[]>('userHobbies');

    this.imgResource = image!;
    this.userName = user!.name;
    this.userHobbies = hobbies!;
    this.document = user!.document;
    this.userBirthday = this.calculateAge(user!.birthday);
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthdateDate = new Date(birthdate);

    let age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  /* Obtener colores pokemons */
  getColorsPokemons() {
    const observables = this.dataSelectedPokemons.map((pokemon) => {
      const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`;
      return this._http.get(url);
    });

    forkJoin(observables).subscribe(
      (respuestas: any[]) => {
        respuestas.forEach((respuesta, index) => {
          this.dataSelectedPokemons[index].color = {
            name: respuesta.color.name,
            url: respuesta.color.url,
          };
        });
      },
      (error) => {
        console.error('Error al obtener detalles de los Pokémon', error);
      }
    );
  }

  goToConfigure() {
    this._router.navigate(['/home/main/configure']);
    this._sessionStorageService.remove('selectedPokemons');
  }

  goToDashboard() {
    this._router.navigate(['/home/main/dashboard']);
    this._sessionStorageService.remove('selectedPokemons');
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        data: [this.userHobbies],
      },
    });
  }


  getMaxValue(pokemon: any, statName: string): number {

    switch (statName.toLowerCase()) {
      case 'hp':
        return 255;
      case 'attack':
        return 190;
      case 'defense':
        return 230;
      case 'special-attack':
        return 194;
      case 'special-defense':
        return 230;
      case 'speed':
        return 180;
      default:
        return 100;
    }
  }
}
