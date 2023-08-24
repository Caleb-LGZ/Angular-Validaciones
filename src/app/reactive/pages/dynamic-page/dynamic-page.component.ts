import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear 5', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', []);

  constructor( private fb: FormBuilder ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, i: number ): boolean | null {
    return formArray.controls[i].errors
      && formArray.controls[i].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`;
      }

    }

    return null;

  }

  onAddFavorite(): void {

    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    // Metodo 1: Mediante forma tradicional
    // this.favoriteGames.push( new FormControl( newGame, Validators.required ) );

    // Metodo 2: Usando FormBuilder
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.myForm.reset();
  }

  onDeleteFavorite( i: number ): void {
    this.favoriteGames.removeAt(i);
  }

  onSubmit(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
