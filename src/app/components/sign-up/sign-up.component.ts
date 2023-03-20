import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }
    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    if (this.password != this.confirmPassword) {
      alert('Password do not match please try again');
      return;
    }

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
