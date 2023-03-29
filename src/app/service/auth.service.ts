import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MyFormData, User } from '../components/user/user';
import { BehaviorSubject, catchError, from, map, Observable, retry, tap, throwError } from 'rxjs';
import { NotificationModule } from '../notifications/notification.module';
import { NotificationService } from './notification.service';
import { Cookie} from 'ng2-cookies/ng2-cookies';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  handleError(handleError: any): any {
    throw new Error('Method not implemented.');
  }
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;
  private readonly apiUrl = 'http://127.0.0.1:8000/user/register/';

  isLoggedIn: boolean = false;
  rememberMe: boolean = false;
  userData: any;
  

  constructor(private fireauth: AngularFireAuth, private router: Router, private notifier : NotificationService,private spinner : NgxSpinnerService,private __cookieService : Cookie,private http: HttpClient) {

    

  }
 
  

  //  auth = this.fireauth.authState.subscribe((user: any) => {
  //   if (user) {
  //     this.userData = user;
  //     localStorage.setItem('user', JSON.stringify(this.userData));
  //     JSON.parse(localStorage.getItem('user')!);
  //   } else {
  //     localStorage.setItem('user', 'null');
  //     JSON.parse(localStorage.getItem('user')!);
  //   }
  // });

  

  login(user1:User) : Observable<any> {
    return from(this.fireauth.signInWithEmailAndPassword(user1.email, user1.password)).pipe(
      map((res) => {
        this.spinner.show();
        // setTimeout(()=>this.spinner.hide(),2000)
        localStorage.setItem('token', 'true');
        this.fireauth.authState.subscribe((user) => {
          if (user) {
            if (user1.isRememberMe) {
              this.resetcredentials()
            Cookie.set('remember','Yes')
            Cookie.set('username',user1.email)
            Cookie.set('password',user1.password)

            }else{
               Cookie.set('remember','No')
             Cookie.set('username','')
             Cookie.set('password','')
            }
             
            // login successful if there's a jwt token in the response
            this.isLoggedIn = true;
           
            setTimeout(()=>{
              this.notifier.onSuccess("Login is succcessful")
              this.spinner.hide()
              this.router.navigate(['home']);
            },3000)
           
          }
        })

        // if (res.user?.emailVerified == true) {
        //   this.router.navigate(['/home']);
        // } else {
        //   this.router.navigate(['/varify-email']);
        // }
        return true
      }),
      catchError((err: any) => {
        this.spinner.hide();
        console.log(err);
        this.notifier.onError(err)
        return throwError(err);
      })
    );
  }

  
  register(user: MyFormData): Observable<any> {
    const headers = { 'content-type': 'application/json','X-CSRFTOKEN': 'csrftoken'}  
    const body =  JSON.stringify(user);
        
    const options = {
      headers,
      mode: 'cors', 
      withCredentials: true // Add this option
      
    };
    return this.http.post(`${this.apiUrl}`,body,options)
    .pipe(tap(console.log),
     catchError(this.handleError));
  
}

  
  forgotPassword(email: string) : Observable<any> {
    return from(this.fireauth.sendPasswordResetEmail(email)).pipe(
      map(() => {
        this.router.navigate(['/varify-email']);
      }),
      map((err) => {
        alert('Something went wrong, please try again');
      })
    );
    this.fireauth.sendSignInLinkToEmail;
  }

  async SendVerificationMail(){
    return this.fireauth.currentUser
      .then((user) => {
        console.log("email sent")
        user?.sendEmailVerification();
        return true
      })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }


  logout() {
    //clear all localstorages and redirect to main publib page
    this.resetcredentials();
    this.router.navigate(['/'], { replaceUrl: true });
  }

  resetcredentials() {
    //clear all localstorages
    localStorage.removeItem('rememberCurrentUser');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    // this.currentUserSubject.next(this.userData);
  }
}
