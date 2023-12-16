import { Mapper } from 'src/app/core/base/mapper';
import { Injectable } from '@angular/core';
import { ResponsePokeEntity } from './dashboardPokemon.web-entity';
import { ResponsePokeModel } from 'src/app/core/domain/dashboardPokemon/dashboardPokemon.model';

@Injectable({
	providedIn: 'root',
})
export class DashboardPokemonMapper
	implements Mapper<ResponsePokeEntity, ResponsePokeModel>
{
	mapFrom(param: ResponsePokeEntity): ResponsePokeModel {

      return {
        abilities: param.abilities,
        base_experience: param.base_experience,
        forms: param.forms,
        game_indices: param.game_indices,
        height: param.height,
        held_items: param.held_items,
        id: param.id,
        is_default: param.is_default,
        location_area_encounters: param. location_area_encounters,
        moves: param.moves,
        name: param.name,
        order: param.order,
        past_abilities: param.past_abilities,
        past_types: param.past_abilities,
        species: param.species,
        sprites: param.sprites,
        stats: param.stats,
        types: param.types,
        weight: param.weight,
        color: param.color
      };



	}

	mapTo(param: ResponsePokeModel): ResponsePokeEntity {


      return {
        abilities: param.abilities,
        base_experience: param.base_experience,
        forms: param.forms,
        game_indices: param.game_indices,
        height: param.height,
        held_items: param.held_items,
        id: param.id,
        is_default: param.is_default,
        location_area_encounters: param. location_area_encounters,
        moves: param.moves,
        name: param.name,
        order: param.order,
        past_abilities: param.past_abilities,
        past_types: param.past_abilities,
        species: param.species,
        sprites: param.sprites,
        stats: param.stats,
        types: param.types,
        weight: param.weight,
        color: param.color
      };



}
}
