import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/presentation/shared/global/modules/session-storage/services/session-storage.service';
import { UserInfo } from '../../interfaces/userInfo.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ResponsePokeEntity } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-entity';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';
import { DashboardPokemonUseCase } from 'src/app/core/usescases/dashboardPokemon/dashboardPokemon.usecase';
import { HttpClient } from '@angular/common/http';
import { informationPokemonUseCase } from 'src/app/core/usescases/informationPokemon/informationPokemon.usecase';
import { InformationPokeEntity } from 'src/app/data/informationPokemon/informationPokemon.web-entity';
import { detailPokemonUseCase } from 'src/app/core/usescases/informationPokemon/detailPokemon.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public hasLoad: boolean = true;
  public imgResource!: string;
  public userName!: string;
  public userHobbies!: string[];
  public userBirthday!: number;
  public document!: string;
  public ResponsePokeEntity!: any[];
  public pokemons: any[] = [];
  public selectedItems: any[] = [];
  public selectedItem!: boolean;
  public selectedItemsId: any[] = [];
  public clickCounter: number = 0;
  public validButton!: boolean;

  constructor(
    private _sessionStorageService: SessionStorageService,
    public dialog: MatDialog,
    private _dashboardPokemonUseCase: DashboardPokemonUseCase,
    private _informationPokemonUseCase: informationPokemonUseCase,
    private _detailPokemonUseCase: detailPokemonUseCase,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this.getInfoPokemons();

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

  async getInfoPokemons() {
    let params = {
      limit: '9',
      offset: '0',
    };

    const response: InformationPokeEntity | HttpErrorResponseStatus =
      await this._informationPokemonUseCase.execute(params);

    if (response instanceof Object) {
      const responseEntity = response as InformationPokeEntity;

      this.pokemons = responseEntity.results;

      for (const pokemon of this.pokemons) {
        this.getPokemonDetails(pokemon.url);
      }
    }
  }

  async onSearch(event: any) {
    const inputValue: string = event.target.value.toLowerCase();

    const response: ResponsePokeEntity | HttpErrorResponseStatus =
      await this._dashboardPokemonUseCase.execute(inputValue);

    if (response instanceof Object) {
      const responseEntity = response as ResponsePokeEntity;

      if (!Array.isArray(this.ResponsePokeEntity)) {
        this.ResponsePokeEntity = [];
      }

      if (
        responseEntity.name == inputValue ||
        responseEntity.id == +inputValue
      ) {
        this.ResponsePokeEntity.push(responseEntity);
      }

      if (
        this.ResponsePokeEntity.some((entity) => entity.name === inputValue)
      ) {
        this.ResponsePokeEntity = this.ResponsePokeEntity.filter(
          (entity) => entity.name !== inputValue
        );
        this.ResponsePokeEntity.unshift(responseEntity);
      }

      if (
        this.ResponsePokeEntity.some(
          (entity) => entity.id === responseEntity.id
        )
      ) {
        this.ResponsePokeEntity = this.ResponsePokeEntity.filter(
          (entity) => entity.id !== responseEntity.id
        );
        this.ResponsePokeEntity.unshift(responseEntity);
      }
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        data: [this.userHobbies],
      },
    });
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

  async getPokemonDetails(pokemon: any) {
    const response: ResponsePokeEntity | HttpErrorResponseStatus =
      await this._detailPokemonUseCase.execute(pokemon);

    if (response instanceof Object) {
      const responseEntity = response as ResponsePokeEntity;

      if (!Array.isArray(this.ResponsePokeEntity)) {
        this.ResponsePokeEntity = [];
      }

      this.ResponsePokeEntity.push(responseEntity);
    }
  }

  toggleSelect(item: any) {
    this.validButton = false;
    this._sessionStorageService.remove('selectedPokemons');

    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      if (this.clickCounter < 3) {
        this.selectedItems.push(item);
        this.clickCounter++;
      }
      if (this.clickCounter == 3) {
        this._sessionStorageService.setValue<ResponsePokeEntity[]>(
          this.selectedItems,
          'selectedPokemons'
        );
        this.validButton = true;
      }
    } else {
      this.selectedItems.splice(index, 1);
      this.clickCounter--;
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  goToProfileComplete() {
    this.hasLoad = false;

    setTimeout(() => {
      this._router.navigate(['/home/main/profile']);
      this.hasLoad = true;
    }, 1000);
  }

  goToConfigure() {
    this._router.navigate(['/home/main/configure']);
  }
}
