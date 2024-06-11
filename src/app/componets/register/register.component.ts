import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { auth } from '../../../types/productType';
import { ProductService } from '../../../services/ProductService';

import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MessagesModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private service: ProductService, private router: Router) {}
  messagesToast: Message[] = [];
  message = '';

  form = new FormGroup({
    useName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('user'),
  });

  register() {
    if (this.form.valid) {
      const data: auth = this.form.value as auth;
      this.service.register(data).subscribe(
        (response) => {
          this.messagesToast = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Đăng nhập thành công',
            },
          ];
          setTimeout(() => {
            this.messagesToast = [];
            this.router.navigate(['/login']);
          }, 1000);
          console.log('Dang ky thanh cong');
          console.log(response);
        },
        (error) => {
          this.message = error.message;
        }
      );
    }
  }
}
