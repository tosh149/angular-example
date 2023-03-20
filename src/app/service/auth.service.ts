import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/home']);

        // if (res.user?.emailVerified == true) {
        //   this.router.navigate(['/home']);
        // } else {
        //   this.router.navigate(['/varify-email']);
        // }
      },
      (err) => {
        alert('Invalid username or password please try again.');
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('User registration successful!');
        this.router.navigate(['/login']);
        this.sendVerificationEmail(res.user);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/signup']);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/varify-email']);
      },
      (err) => {
        alert('Something went wrong, please try again');
      }
    );
    this.fireauth.sendSignInLinkToEmail;
  }

  sendVerificationEmail(user: any) {
    user.sendSignInLinkToEmail().then(
      (res: any) => {
        this.router.navigate(['/varify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Not ablie to send email to your email.');
      }
    );
  }
}
