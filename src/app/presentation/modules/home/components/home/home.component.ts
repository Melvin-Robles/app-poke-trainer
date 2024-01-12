import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/presentation/shared/global/modules/session-storage/services/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  hasLoad: boolean = true;

  constructor(
    private _router: Router,
    private _sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this._sessionStorageService.remove('userInfo');
    this._sessionStorageService.remove('userImage');
    this._sessionStorageService.remove('userHobbies');
  }

  goToDasboard() {
    this.hasLoad = false;

    setTimeout(() => {
      this._router.navigate(['/home/main/configure']);
      this.hasLoad = true;
    }, 1000);
  }
}
