import { Pipe, PipeTransform } from '@angular/core';
import { PokemonModel } from '../utils/models/pokemon.model';

@Pipe({
  name: 'filterPokemon'
})
export class FilterPokemonPipe implements PipeTransform {

  transform(values: PokemonModel[], filter: string,): PokemonModel[] {
    if (!filter || !values) {
      return values;
    }
    return values.filter(x => x.name?.toLowerCase().indexOf(filter?.toLowerCase()) >= 0);
  }

}
