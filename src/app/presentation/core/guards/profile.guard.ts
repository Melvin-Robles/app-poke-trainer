import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionStorageService } from '../../shared/global/modules/session-storage/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private _router: Router, private _sessionStorageService: SessionStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const selectedPokemon = this._sessionStorageService.getValue('selectedPokemons');

    if (selectedPokemon) {
      return true;
    } else {
      this._router.navigate(['/home']);
      return false;
    }
  }
}
