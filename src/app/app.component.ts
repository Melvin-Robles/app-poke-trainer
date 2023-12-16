import { Component } from '@angular/core';
import { DashboardPokemonUseCase } from './core/usescases/dashboardPokemon/dashboardPokemon.usecase';
import { ResponsePokeEntity } from './data/dashboardPokemon/dashboardPokemon.web-entity';
import { HttpErrorResponseStatus } from './presentation/core/config/http-error-response-status.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){}

  ngOnInit(): void {



}

}


