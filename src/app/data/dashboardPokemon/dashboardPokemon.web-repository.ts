
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAdapter } from 'src/app/presentation/shared/global/interfaces/http-adapter.interface';
import { EndPointUrl } from '../http-adapter';
import { DashboardPokemonRepository } from 'src/app/core/repositories/dashboardPokemon/dashboardPokemon.repository';
import { ResponsePokeModel } from 'src/app/core/domain/dashboardPokemon/dashboardPokemon.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardPokemonWebRepository implements EndPointUrl, DashboardPokemonRepository {
  public readonly API: string = 'https://pokeapi.co/api/v2/';

  constructor(private _http: HttpClient) {}

  /**
   * @method getResponsePokemon
   *
   */

  public getResponsePokemon(searchParameters: string): Observable<ResponsePokeModel> {
    return this._http.get<ResponsePokeModel>(
      `${this.API}pokemon/${searchParameters}`
    );
  }
}
