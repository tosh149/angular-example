/**
 * https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/
 */
 import { Injectable } from '@angular/core';
 import { ValidatorFn, AbstractControl } from '@angular/forms';
 import { FormGroup } from '@angular/forms';
 import { hasLowerCaseCharacters } from '@fireflysemantics/validatorts';
 
 @Injectable({
   providedIn: 'root',
 })
 export class ValidationService {
   constructor() {}
 
 
   passwordMatch(password: string, confirmPassword: string): ValidatorFn {
     return (formGroup: AbstractControl): { [key: string]: any } | null => {
       const passwordControl = formGroup.get(password)?.value;
       const confirmPasswordControl = formGroup.get(confirmPassword)?.value;
 
       if (!passwordControl || !confirmPasswordControl) {
         return null;
       }
 
       if (
         confirmPasswordControl.errors &&
         !confirmPasswordControl.errors['passwordMismatch']
       ) {
         return null;
       }
 
       if (passwordControl.value !== confirmPasswordControl.value) {
         confirmPasswordControl.setErrors({ passwordMismatch: true });
         return { passwordMismatch: true };
       } else {
         confirmPasswordControl.setErrors(null);
         return null;
       }
     };
   }
 }
 