import { Observable } from 'rxjs';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';
import { ResponsePokeModel } from '../../domain/dashboardPokemon/dashboardPokemon.model';

export abstract class PokemonDetailRepository {
	abstract getResponseDetailPokemon(url: string): Observable<ResponsePokeModel | HttpErrorResponseStatus>;
}
