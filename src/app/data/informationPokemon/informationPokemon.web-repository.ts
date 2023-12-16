
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAdapter } from 'src/app/presentation/shared/global/interfaces/http-adapter.interface';
import { EndPointUrl } from '../http-adapter';
import { DashboardPokemonRepository } from 'src/app/core/repositories/dashboardPokemon/dashboardPokemon.repository';
import { ResponsePokeModel } from 'src/app/core/domain/dashboardPokemon/dashboardPokemon.model';
import { PokemonInformationRepository } from 'src/app/core/repositories/informationPokemon/informationPokemon.repository';
import { paginationParamsModel } from 'src/app/core/domain/informationPokemon/paginationParams.model';
import { InformationPokeModel } from 'src/app/core/domain/informationPokemon/informationPokemon.model';

@Injectable({
  providedIn: 'root',
})
export class informationPokemonWebRepository implements EndPointUrl, PokemonInformationRepository {
  public readonly API: string = 'https://pokeapi.co/api/v2/';

  constructor(private _http: HttpClient) {}

  /**
   * @method getResponseInformationPokemon
   */
  public getResponseInformationPokemon(paginationParams: paginationParamsModel): Observable<InformationPokeModel> {
    return this._http.get<InformationPokeModel>(
      `${this.API}pokemon?limit=${paginationParams.limit}&offset=${paginationParams.offset}`
    );
  }
}
