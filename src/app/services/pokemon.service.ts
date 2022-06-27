import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonModel } from '../utils/models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _baseUrl: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._baseUrl = environment.baseUrl;
  }

  public getPokemons(): Observable<PokemonModel[]> {
    const url = this._baseUrl;
    const params = {
      idAuthor: 1
    }
    return this._httpClient.get<PokemonModel[]>(url, {params});
  }

  public getPokemon(id: number): Observable<PokemonModel> {
    return this._httpClient.get<PokemonModel>('...');
  }

  public insertPokemon(pokemon: PokemonModel): Observable<PokemonModel> {
    const url = this._baseUrl;

    return this._httpClient.post<PokemonModel>(url, {...pokemon, idAuthor: 1});
  }

  public updatePokemon(id: number, pokemon: PokemonModel): Observable<PokemonModel> {
    const url = `${this._baseUrl}/${id}`;
    return this._httpClient.put<PokemonModel>(url, {...pokemon, idAuthor: 1});
  }

  public deletePokemon(id: number): Observable<void> {
    const url = `${this._baseUrl}/${id}`;
    return this._httpClient.delete<void>(url);
  }
}
