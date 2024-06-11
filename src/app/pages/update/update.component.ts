import { Component } from '@angular/core';
import { ButtonComponent } from '../../componets/button/button.component';
import { ProductService } from '../../../services/ProductService';
import Product from '../../../types/productType';
import { ProductFormData } from '../../../types/productType';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponseDetail } from '../../../services/ProductService';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { Category } from '../../../types/productType';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, NgIf, NgFor, MessagesModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  productId: string | null = null;
  product: Product | null = null;
  messages: Message[] = [];
  category: Category[] = [];
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.getDetail(this.productId).subscribe(
          (response: ApiResponseDetail) => {
            this.product = response.data;
            console.log(this.product);

            const now = new Date(response.data.startAt);
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            const startAt = now.toISOString().slice(0, 16);

            if (this.product) {
              this.form.patchValue({
                ...response.data,
                startAt: startAt,
              });
            }
          },
          (error) => {
            console.error('Error', error);
          }
        );
      }
    });
    this.productService.getCategory().subscribe(
      (response) => {
        this.category = response.data;
        console.log(this.category);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    desc: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(1, [Validators.required, Validators.min(0)]),
    category: new FormControl(),
    isShow: new FormControl(true),
    startAt: new FormControl(''),
    bidTime: new FormControl(0),
  });

  onSubmit() {
    if (this.form.valid) {
      const data: ProductFormData = this.form.value as ProductFormData;
      if (this.productId) {
        this.productService.putProduct(this.productId, data).subscribe(
          (response) => {
            console.log(response);
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
            this.errorMessage = 'Cập nhật sản phẩm thất bại';
            console.log('Cập nhật thất bại', error);
          }
        );
      }
    } else {
      console.log('Bạn phải nhập giá trị khác giá trị cũ');
    }
  }
}
