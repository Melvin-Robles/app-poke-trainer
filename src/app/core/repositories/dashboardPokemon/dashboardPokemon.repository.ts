import { Observable } from 'rxjs';
import { ResponsePokeModel } from '../../domain/dashboardPokemon/dashboardPokemon.model';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';

export abstract class DashboardPokemonRepository {
	abstract getResponsePokemon(searchParameters: string): Observable<ResponsePokeModel | HttpErrorResponseStatus>;
}
