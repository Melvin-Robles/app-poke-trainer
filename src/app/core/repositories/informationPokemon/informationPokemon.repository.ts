import { Observable } from 'rxjs';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';
import { InformationPokeModel } from '../../domain/informationPokemon/informationPokemon.model';
import { paginationParamsModel } from '../../domain/informationPokemon/paginationParams.model';

export abstract class PokemonInformationRepository {
	abstract getResponseInformationPokemon(paginationParams: paginationParamsModel): Observable<InformationPokeModel | HttpErrorResponseStatus>;
}
