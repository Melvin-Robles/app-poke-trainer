import { Mapper } from 'src/app/core/base/mapper';
import { Injectable } from '@angular/core';
import { InformationPokeEntity } from './informationPokemon.web-entity';
import { InformationPokeModel } from 'src/app/core/domain/informationPokemon/informationPokemon.model';

@Injectable({
	providedIn: 'root',
})
export class informationPokemonMapper
	implements Mapper<InformationPokeEntity, InformationPokeModel>
{
	mapFrom(param: InformationPokeEntity): InformationPokeModel {

      return {
        count:param.count,
        next: param.next,
        previous:param.previous,
        results: param.results
      };



	}

	mapTo(param: InformationPokeModel): InformationPokeEntity {


      return {
        count:param.count,
        next: param.next,
        previous:param.previous,
        results: param.results
      };



}
}
