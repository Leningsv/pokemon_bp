import { PokemonModel } from './pokemon.model';
import { ActionType } from '../application.type';

export interface PokemonHandlerModel {
  pokemon?: PokemonModel,
  action: ActionType,
}
