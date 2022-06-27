import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsComponent } from './pokemons.component';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { POKEMONS } from '../../mocks/pokemons.mock';
import { ReactiveFormsModule } from '@angular/forms';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  const pokemonService = new PokemonService(null);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonsComponent);
    component = new PokemonsComponent(pokemonService);
    fixture.detectChanges();
  });

  function getPokemons() {
    spyOn(pokemonService, 'getPokemons').and.callFake(() => {
      return of(POKEMONS);
    });
    component.getPokemons();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Pokemons', async () => {
    spyOn(pokemonService, 'getPokemons').and.returnValue(of(POKEMONS));
    await component.getPokemons();
    expect(component.pokemons.length).toBeTruthy();
  });

  it('should delete Pokemon', async () => {
    getPokemons();
    spyOn(pokemonService, 'deletePokemon').and.returnValue(of(null));
    const pokemonId = '1';
    await component.deletePokemon(pokemonId);
    expect(!component.pokemons.find(x => x.id === pokemonId)).toBeTruthy();
  });

  it('should delete not found Pokemon', () => {
    const error = 'not found pokemon';
    getPokemons();
    const spy = spyOn(pokemonService, 'deletePokemon').and.throwError(error);
    const pokemonId = '0';
    component.deletePokemon(pokemonId).then();
    expect(spy).toThrowError(error);
  });
});


