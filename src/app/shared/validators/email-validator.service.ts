import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {
  http: any;

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {

      console.log({email});

      if ( email === 'caleb@gmail.com' ) {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
      }

      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(2000)
    );

    return httpCallObservable;

  }

}


// return this.http.get(`https://localhost:3000/users?q=${ email }`)
//             .pipe(
//               map( resp => {
//                 return ( resp.length === 0) ? null : { emailTaken: true }
//               } )
//             )
