import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionType } from '../../utils/application.type';
import { PokemonModel } from '../../utils/models/pokemon.model';
import { PokemonHandlerModel } from '../../utils/models/pokemon-handler.model';
import { PokemonService } from '../../services/pokemon.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit, OnChanges {
  @Input()
  public actionType: ActionType;
  @Input()
  public pokemon: PokemonModel;
  @Input()
  public title: string;
  @Output()
  public pokemonHandler: EventEmitter<PokemonHandlerModel>;
  public pokemonForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _pokemonService: PokemonService
  ) {
    this.initVariables();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'] && this.actionType === 'edith') {
      this.pokemonForm.reset(changes['pokemon'].currentValue)
    }
    if (changes['pokemon'] && this.actionType === 'add') {
      this.initPokemonForm();
    }
  }

  private initVariables(): void {
    this.pokemonHandler = new EventEmitter<PokemonHandlerModel>();
    this.initPokemonForm();
  }

  private initPokemonForm(): void {
    this.pokemonForm = this._formBuilder.group({
      id: '',
      defense: [0, [Validators.required]],
      attack: [0, [Validators.required]],
      image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      hp: [0, [Validators.required]],
      type: ['', [Validators.required]],
    })
  }

  public cancel(): void {
    this.initPokemonForm();
    this.pokemonHandler.emit({action: 'cancel'})
  }

  public async insertPokemon(): Promise<void> {
    if (this.pokemonForm.invalid) {
      return;
    }
    try {
      const pokemon = await lastValueFrom(this._pokemonService.insertPokemon(this.pokemonForm.getRawValue()));
      this.pokemonHandler.emit({action: 'insert', pokemon})
      this.initPokemonForm();
      alert('Pokemon registrado exitosamente')
    } catch (e) {
      throw e;
    }
  }

  public async updatePokemon(): Promise<void> {
    if (this.pokemonForm.invalid) {
      return;
    }
    try {
      const pokemon = await lastValueFrom(this._pokemonService.updatePokemon(this.pokemonForm.get('id').value, this.pokemonForm.getRawValue()));
      this.pokemonHandler.emit({action: 'update', pokemon})
      alert('Pokemon actualizado exitosamente')
    } catch (e) {
      throw e;
    }
  }
}
