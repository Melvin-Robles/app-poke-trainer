import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorageService } from 'src/app/presentation/shared/global/modules/session-storage/services/session-storage.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

public dataHobbies!: string[]

  constructor(
    @Inject(
      MAT_DIALOG_DATA) public data: string[],
      private _sessionStorageService: SessionStorageService,
    ) {

    this.dataHobbies = this._sessionStorageService.getValue<string[]>('userHobbies')!;

   }


}
