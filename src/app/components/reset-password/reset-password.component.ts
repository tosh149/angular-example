import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  code: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  sendResetEmail() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
