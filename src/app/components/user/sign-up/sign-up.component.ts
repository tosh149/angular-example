import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getError, UState } from '../state/user.reducer';
import { UserSignupActions } from '../state/actions';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MyFormData, User } from '../user';
import { NotificationService } from 'src/app/service/notification.service';
import { Country, State, City, IState, ICity }  from 'country-state-city';
import { ValidationService } from '../../../service/validate.service'
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})


export class SignUpComponent implements OnInit {
  @ViewChild('country')
  country!: ElementRef; 
  @ViewChild('city')
  city!: ElementRef;
  @ViewChild('state')
  state!: ElementRef;

  countries = Country.getAllCountries();
  states: IState[] = [];
  cities: ICity[] = [];

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;



  
  
  username:string = '';
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  myForm!: FormGroup;

  errorMessage$!: Observable<string>;
  constructor(private store: Store<UState>,private notifier : NotificationService,private _formBuilder: FormBuilder,private v: ValidationService) {
   

      
  }

  ngOnInit(): void {

    this.errorMessage$ = this.store.select(getError);

    this.firstFormGroup = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required]
      }),
      this.secondFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
      }),
      this.thirdFormGroup = this._formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.compose([Validators.required])],
        })

        // this.myForm = new FormGroup({});
        // this.myForm.addControl('firstFormGroup', this.firstFormGroup);
        // this.myForm.addControl('secondFormGroup', this.secondFormGroup);
        // this.myForm.addControl('thirdFormGroup', this.thirdFormGroup);
    
       
        // this.myForm.valueChanges.subscribe(value => {
        //   console.log(value);
        // })
        
  }


  onCountryChange($event: Event): void {
    this.states = State.getStatesOfCountry(JSON.parse(this.country.nativeElement.value).isoCode);
    this.selectedCountry = JSON.parse(this.country.nativeElement.value);
    this.cities = this.selectedState = this.selectedCity = [];
  }

  onStateChange($event: Event): void {
    this.cities = City.getCitiesOfState(JSON.parse(this.country.nativeElement.value).isoCode, JSON.parse(this.state.nativeElement.value).isoCode)
    this.selectedState = JSON.parse(this.state.nativeElement.value);
    this.selectedCity = null;

  }

  onCityChange($event: Event): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value)
  }

  clear(type: string): void {
    switch(type) {
      case 'country':
        this.selectedCountry = this.country.nativeElement.value = this.states = this.cities = this.selectedState = this.selectedCity = [];
        break;
      case 'state':
        this.selectedState = this.state.nativeElement.value = this.cities = this.selectedCity = [];
        break;
      case 'city':
        this.selectedCity = this.city.nativeElement.value = {};
        break;
    }
  }



  register() {
  
    this.myForm = this._formBuilder.group({
      first_name: this.firstFormGroup.controls['first_name'],
      last_name: this.firstFormGroup.controls['last_name'],
      email: this.firstFormGroup.controls['email'],
      dob: this.firstFormGroup.controls['dob'],
      country: this.secondFormGroup.controls['country'],
      state: this.secondFormGroup.controls['state'],
      city: this.secondFormGroup.controls['city'],
      password: this.thirdFormGroup.controls['password'],          
      confirmPassword: this.thirdFormGroup.controls['confirmPassword']          
  });

      const user : MyFormData  =  this.myForm.value ;
    console.log(user);
    this.store.dispatch(UserSignupActions.signupUser({user}))
    this.v.passwordMatch(this.thirdFormGroup.get('password')?.value, this.thirdFormGroup.get('confirmPassword')?.value)
    // this.email = '';
    // this.password = '';
    // this.confirmPassword = '';
  }

  get passwordControl(): AbstractControl {
    return this.thirdFormGroup.get('password')?.value;
  }

  get confirmPasswordControl() {
    return this.thirdFormGroup.get('confirmPassword')?.value;
  }

  public getConfirmPasswordError() {
    const control: AbstractControl = this.confirmPasswordControl
    return control.hasError('required')
      ? 'Please confirm the  password'
      : control.hasError('passwordMismatch')
      ? 'The passwords do not match'
      : '';
  }
}
