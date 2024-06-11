import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/ProductService';
import { auth } from '../../../types/productType';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private service: ProductService,
    private router: Router,
    private authService: AuthService
  ) {}
  message = '';
  messagesToast: Message[] = [];

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    if (this.form.valid) {
      const data: auth = this.form.value as auth;
      this.service.login(data).subscribe(
        (response) => {
          this.authService.updateUserData(response.data);
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          localStorage.setItem('userData', JSON.stringify(response.data));
          this.authService.updateUserData(response.data);
          this.messagesToast = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Đăng nhập thành công',
            },
          ];
          setTimeout(() => {
            this.messagesToast = [];
            if (response.data.role == 'admin') {
              this.router.navigate(['admin']);
            } else if (response.data.role == 'user') {
              this.router.navigate(['/']);
            }
          }, 1000);
          console.log(response.message);
        },
        (error) => {
          this.message = error.message;
          // if (error.error.message) {
          //   this.message = error.error.message;
          //   console.log(this.message);
          // } else if (error.error.errors) {
          //   this.message = error.error.errors;
          // }
        }
      );
    }
  }
}
