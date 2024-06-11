import { Component } from '@angular/core';
import { ButtonComponent } from '../../componets/button/button.component';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/ProductService';
import { ProductFormData } from '../../../types/productType';
import { Category } from '../../../types/productType';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, NgIf, NgFor, MessagesModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  constructor(private productService: ProductService, private router: Router) {}
  messages: Message[] = [];
  category: Category[] = [];
  errorMessage: string | null = null;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(5)]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(1, [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
    startAt: new FormControl(''),
    bidTime: new FormControl(''),
    bidPriceMax: new FormControl(0),
  });

  ngOnInit(): void {
    this.productService.getCategory().subscribe(
      (response) => {
        this.category = response.data;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      // Chuyển đổi giá trị category thành số
      const data: ProductFormData = {
        ...formValue,
        isShow: Boolean(formValue.isShow),
      } as ProductFormData;

      this.productService.addProduct(data).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.messages = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Thêm sản phẩm thành công',
            },
          ];
          setTimeout(() => {
            this.messages = [];
            this.router.navigate(['admin/list']);
          }, 1000);
        },
        (error) => {
          this.errorMessage = 'Thêm sản phẩm thất bại: ' + error.message;
        }
      );
      console.log(data);
    } else {
      console.log('Form không hợp lệ');
    }
  }
}
