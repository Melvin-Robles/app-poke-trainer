import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionStorageService } from '../../shared/global/modules/session-storage/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private _router: Router, private _sessionStorageService: SessionStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userInfo = this._sessionStorageService.getValue('userInfo');

    if (userInfo) {
      return true;
    } else {
      this._router.navigate(['/home']);
      return false;
    }
  }
}
