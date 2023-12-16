import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseCase } from '../../base/use-case';
import { ResponsePokeEntity } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-entity';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';
import { DashboardPokemonWebRepository } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-repository';
import { DashboardPokemonMapper } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-repository-mapper';
import { ResponsePokeModel } from '../../domain/dashboardPokemon/dashboardPokemon.model';

@Injectable({
	providedIn: 'root',
})
export class DashboardPokemonUseCase
	implements UseCase<string, ResponsePokeEntity | HttpErrorResponseStatus>
{
	private _conflictError!: HttpErrorResponseStatus;

	constructor(
		private _dashboardPokemonWebRepository: DashboardPokemonWebRepository,
		private _dashboardPokemonMapper: DashboardPokemonMapper
	) {}

	execute(searchParameters: string): Promise<ResponsePokeEntity | HttpErrorResponseStatus> {
		try {
			return new Promise<ResponsePokeEntity | HttpErrorResponseStatus>((resolve, reject) => {
				this._dashboardPokemonWebRepository.getResponsePokemon(searchParameters).subscribe({
					next: res => {
            resolve(this._dashboardPokemonMapper.mapTo(res))
          },
					error: (error: HttpErrorResponse) => resolve(<HttpErrorResponseStatus>error.status),
				});
			});
		} catch (error) {
			return new Promise<HttpErrorResponseStatus>((resolve, reject) => {
				resolve(this._conflictError);
			});
		}
	}
}
