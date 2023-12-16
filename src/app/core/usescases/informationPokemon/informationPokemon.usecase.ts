import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseCase } from '../../base/use-case';
import { HttpErrorResponseStatus } from 'src/app/presentation/core/config/http-error-response-status.type';
import { paginationParamsModel } from '../../domain/informationPokemon/paginationParams.model';
import { informationPokemonWebRepository } from 'src/app/data/informationPokemon/informationPokemon.web-repository';
import { informationPokemonMapper } from 'src/app/data/informationPokemon/informationPokemon.web-repository-mapper';
import { InformationPokeEntity } from 'src/app/data/informationPokemon/informationPokemon.web-entity';

@Injectable({
	providedIn: 'root',
})
export class informationPokemonUseCase
	implements UseCase<paginationParamsModel, InformationPokeEntity | HttpErrorResponseStatus>
{
	private _conflictError!: HttpErrorResponseStatus;

	constructor(
		private _informationPokemonWebRepository: informationPokemonWebRepository,
		private _informationPokemonMapper: informationPokemonMapper
	) {}

	execute(pagination: paginationParamsModel): Promise<InformationPokeEntity | HttpErrorResponseStatus> {
		try {
			return new Promise<InformationPokeEntity | HttpErrorResponseStatus>((resolve, reject) => {
				this._informationPokemonWebRepository.getResponseInformationPokemon(pagination).subscribe({
					next: res => {
            resolve(this._informationPokemonMapper.mapTo(res))
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
