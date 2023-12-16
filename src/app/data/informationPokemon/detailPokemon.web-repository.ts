
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
import { PokemonDetailRepository } from 'src/app/core/repositories/informationPokemon/detailPokemon.repository';

@Injectable({
  providedIn: 'root',
})
export class detailPokemonWebRepository implements PokemonDetailRepository {

  constructor(private _http: HttpClient) {}

  /**
   * @method getResponseDetailPokemon
   */
  public getResponseDetailPokemon(url: string): Observable<ResponsePokeModel> {
    return this._http.get<ResponsePokeModel>(
      `${url}`
    );
  }
}
