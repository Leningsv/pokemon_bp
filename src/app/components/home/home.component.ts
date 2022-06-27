import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonHandlerModel } from '../../utils/models/pokemon-handler.model';
import { PokemonModel } from '../../utils/models/pokemon.model';
import { ActionType } from '../../utils/application.type';
import { PokemonsComponent } from '../pokemons/pokemons.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private pokemonActionStrategy: any;
  public title: any;
  public pokemon: PokemonModel;
  public actionType: ActionType;
  @ViewChild('pokemons')
  public pokemonsComponent: PokemonsComponent;

  constructor() {
    this.initVariables();
    this.initPokemonActionStrategy();
  }

  ngOnInit(): void {
  }

  private initVariables(): void {
    this.actionType = 'init';
    this.pokemon = null;
    this.title = '';
  }

  private initPokemonActionStrategy(): void {
    this.pokemonActionStrategy = {
      init: () => {
        this.initVariables();
      },
      add: (payload: PokemonHandlerModel) => {
        this.actionType = payload.action;
        this.title = 'Nuevo Pokemon';
        this.pokemon = null;
      },
      edith: (payload: PokemonHandlerModel) => {
        this.actionType = payload.action;
        this.title = 'Editar Pokemon'
        this.pokemon = payload.pokemon;
      },
      insert: (payload: PokemonHandlerModel) => {
        this.pokemonsComponent.pokemons = [...this.pokemonsComponent.pokemons, payload.pokemon];
      },
      cancel: () => {
        this.initVariables();
      },
      update: (payload: PokemonHandlerModel) => {
        const index = this.pokemonsComponent.pokemons.findIndex(x => x.id === payload.pokemon.id);
        this.pokemonsComponent.pokemons[index] = payload.pokemon;
      }
    }
  }

  public actionHandler($event: PokemonHandlerModel): void {
    if (!this.pokemonActionStrategy[$event?.action]) {
      return;
    }
    this.pokemonActionStrategy[$event.action]($event)
  }
}
