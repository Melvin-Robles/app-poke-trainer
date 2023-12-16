import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseCase } from '../../base/use-case';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';
import { paginationParamsModel } from '../../domain/informationPokemon/paginationParams.model';
import { informationPokemonWebRepository } from 'src/app/data/informationPokemon/informationPokemon.web-repository';
import { informationPokemonMapper } from 'src/app/data/informationPokemon/informationPokemon.web-repository-mapper';
import { InformationPokeEntity } from 'src/app/data/informationPokemon/informationPokemon.web-entity';
import { ResponsePokeEntity } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-entity';
import { detailPokemonWebRepository } from 'src/app/data/informationPokemon/detailPokemon.web-repository';
import { DashboardPokemonMapper } from 'src/app/data/dashboardPokemon/dashboardPokemon.web-repository-mapper';

@Injectable({
	providedIn: 'root',
})
export class detailPokemonUseCase
	implements UseCase<string, ResponsePokeEntity | HttpErrorResponseStatus>
{
	private _conflictError!: HttpErrorResponseStatus;

	constructor(
		private _detailPokemonWebRepository: detailPokemonWebRepository,
		private _dashboardPokemonMapper: DashboardPokemonMapper
	) {}

	execute(url: string): Promise<ResponsePokeEntity | HttpErrorResponseStatus> {
		try {
			return new Promise<ResponsePokeEntity | HttpErrorResponseStatus>((resolve, reject) => {
				this._detailPokemonWebRepository.getResponseDetailPokemon(url).subscribe({
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
