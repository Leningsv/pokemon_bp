import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonModel } from '../../utils/models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { lastValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PokemonHandlerModel } from '../../utils/models/pokemon-handler.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  public pokemons: PokemonModel[];
  public filter: FormControl;
  @Output()
  public actionHandler: EventEmitter<PokemonHandlerModel>

  constructor(
    private _pokemonService: PokemonService
  ) {
    this.initVariables();
  }

  ngOnInit(): void {
    this.getPokemons().then();
  }

  private initVariables(): void {
    this.pokemons = [];
    this.filter = new FormControl<any>('');
    this.actionHandler = new EventEmitter<PokemonHandlerModel>();
  }

  public async getPokemons(): Promise<void> {
    try {
      this.pokemons = await lastValueFrom(this._pokemonService.getPokemons())
    } catch (e) {
      throw e;
    }
  }

  public async deletePokemon(id: number): Promise<void> {
    try {
      await lastValueFrom(this._pokemonService.deletePokemon(id))
      const indexPokemon = this.pokemons.findIndex(x => x.id === id);
      this.pokemons.splice(indexPokemon, 1);
    } catch (e) {
      alert('not found pokemon');
    }
  }

  public addPokemon(): void {
    this.actionHandler.emit({action: 'add'})
  }

  public edithPokemon(pokemon: PokemonModel): void {
    this.actionHandler.emit({action: 'edith', pokemon})
  }
}
