import { Component, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SessionStorageService } from 'src/app/presentation/shared/global/modules/session-storage/services/session-storage.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../interfaces/userInfo.interface';

@Component({
  selector: 'app-config-profile',
  templateUrl: './config-profile.component.html',
  styleUrls: ['./config-profile.component.scss'],
})
export class ConfigProfileComponent {
  public imageSelect: File | null = null;
  public base64Image: string | null = null;
  public urlImage: string | null = null;
  public user: UserInfo | null = null;
  public profileForm!: FormGroup;
  public personAdult!: boolean;
  public hasLoad: boolean = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public hobbiesCtrl = new FormControl('');
  public filteredHobbies!: Observable<string[]>;
  public hobbies: string[] = [];
  public allhobbies: string[] = [
    'Jugar Fútbol',
    'Jugar Basquetball',
    'Jugar Tennis',
    'Jugar Voleibol',
    'Jugar Fifa',
    'Jugar Videojuegos',
    'Programar',
  ];

  @ViewChild('hobbieInput') hobbieInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _router: Router
  ) {
    this.filteredHobbies = this.hobbiesCtrl.valueChanges.pipe(
      startWith(null),
      map((hobbie: string | null) =>
        hobbie ? this._filter(hobbie) : this.allhobbies.slice()
      )
    );


  }

  ngOnInit(): void {
    const image = this._sessionStorageService.getValue('userImage')
    if (typeof image === 'string') {
      this.urlImage = image;
    }

    const user: UserInfo = this._sessionStorageService.getValue('userInfo')!
    if (typeof user === 'object') {
      this.user = user;
    }

    this._initForm(this.urlImage!, this.user?.name, this.user?.document);
    this.subscribeToFormChanges();

  }

  private _initForm(file?:string, name?:string, docu?:string) {
    this.profileForm = this.fb.group({
      file: [ file ? file : '', Validators.required],
      name: [name ? name : '', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      birthday: ['', [Validators.required, this.dateValidator]],
      document: [{ value: docu ? docu : '', disabled: true }],
      time: [''],
    });

    this.profileForm.get('birthday')?.valueChanges.subscribe(() => {
      this.updateDocumentValidation();
    });

    this.profileForm
      .get('document')
      ?.valueChanges.subscribe((value: string) => {
        const currentValue = this.profileForm.get('document')?.value;

        if (this.isPersonAdult()) {
          this.profileForm
            .get('document')
            ?.setValue(currentValue.slice(0, 11), { emitEvent: false });
        } else if (!this.isPersonAdult()) {
          this.profileForm
            .get('document')
            ?.setValue(currentValue.slice(0, 10), { emitEvent: false });
        }
      });
  }

  updateDocumentValidation() {
    const documentControl = this.profileForm.get('document') as AbstractControl;
    const birthdayControl = this.profileForm.get('birthday');

    if (birthdayControl?.valid) {
      documentControl.enable();
    } else {
      documentControl.disable();
    }

    if (this.isPersonAdult()) {
      this.personAdult = false;
      documentControl?.clearValidators();
      documentControl?.setValidators(Validators.pattern(/^\d{4}-\d{6}$/));
    } else {
      this.personAdult = true;
      documentControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{8}-\d$/),
      ]);
    }

    documentControl?.updateValueAndValidity();
  }

  isPersonAdult(): boolean {
    const today = new Date();
    const birthday = new Date(this.profileForm.get('birthday')?.value);

    const age = today.getFullYear() - birthday.getFullYear();

    return age < 18;
  }

  onFileChanged(event: any) {
    this.imageSelect = event.target.files[0];
    this.convertToBase64(this.imageSelect);
    this.viewImage();
  }

  convertToBase64(image: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.base64Image = event.target.result;
      this.savePhoto(this.base64Image);
    };
    reader.readAsDataURL(image);
  }

  async savePhoto(photo: any) {
    if (photo) {
      this._sessionStorageService.setValue<string>(photo, 'userImage');
    }
  }

  viewImage() {
    if (this.imageSelect) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.urlImage = e.target?.result as string;
      };
      reader.readAsDataURL(this.imageSelect);
    }
  }

  onSubmit() {
    this.hasLoad = false;

    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      this._sessionStorageService.setValue<UserInfo>(formData, 'userInfo');
      this._sessionStorageService.setValue<string[]>(
        this.hobbies,
        'userHobbies'
      );

      setTimeout(() => {
        this._router.navigate(['home/main/dashboard']);
        this.hasLoad = true;
      }, 1000);
    }
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hobbies.push(value);
    }

    event.chipInput!.clear();
    this.hobbiesCtrl.setValue(null);
  }

  remove(hobbie: string): void {
    const index = this.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  selected(event: any): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbieInput.nativeElement.value = '';
    this.hobbiesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allhobbies.filter((hobbie) =>
      hobbie.toLowerCase().includes(filterValue)
    );
  }

  goToHome() {
    this._router.navigate(['/home']);
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();

    if (fechaSeleccionada > fechaActual) {
      return { fechaFutura: true };
    }
    if (fechaSeleccionada.getFullYear() === fechaActual.getFullYear()) {
      return { mismoAnio: true };
    }

    return null;
  }

  private subscribeToFormChanges() {
    this.profileForm.get('document')!.valueChanges.subscribe((documentValue) => {
      if (this.personAdult && documentValue.length === 9) {
        const modifiedDocumentValue =
          documentValue.slice(0, 8) + '-' + documentValue.slice(8);
        this.profileForm.get('document')!.setValue(modifiedDocumentValue, { emitEvent: false });
      }
      if (!this.personAdult && documentValue.length === 4) {
        const modifiedDocumentValue =
          documentValue.slice(0, 4) + '-' + documentValue.slice(4);
        this.profileForm.get('document')!.setValue(modifiedDocumentValue, { emitEvent: false });
      }
    });



  }

  onKeyDown(event: KeyboardEvent): void {

  if (event.key === 'Backspace') {
    this.profileForm.get('document')!.setValue('');

  }

  }

  }


