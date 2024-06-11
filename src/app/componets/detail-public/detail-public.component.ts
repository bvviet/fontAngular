import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponseDetail } from '../../../services/ProductService';
import { ProductService } from '../../../services/ProductService';
import Product from '../../../types/productType';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { BidService } from '../../../services/bid.service';
import { bidType, userId } from '../../../types/bidsType';

@Component({
  selector: 'app-detail-public',
  standalone: true,
  templateUrl: './detail-public.component.html',
  styleUrls: ['./detail-public.component.css'],
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule, CountdownComponent],
})
export class DetailPublicComponent implements AfterViewInit {
  productId: string | null = null;
  product!: Product | undefined;
  errorMessage: string | null = null;
  userId: userId[] = [];

  userData: any;

  bidPriceMax: number | null = null;
  highestBid!: bidType | null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private bidSv: BidService
  ) {}

  bidForm = new FormGroup({
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    bidPriceMax: new FormControl(1),
  });

  // Đếm ngược thời gian
  timerConfig = { leftTime: 1 };
  isShowing = false;
  // Ẩn khi = 0
  handleCountDown(event: any) {
    if (event.action === 'done') {
      this.isShowing = false;
    }
  }

  // Lấy thông tin sản phẩm và người dùng đăng sản phẩm
  getPrAndUser() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.getDetail(this.productId).subscribe(
          (response: ApiResponseDetail) => {
            this.product = response.data;
            console.log(this.product.bids);

            const stepTimeBid = Math.floor(
              (new Date(response.data.endAt).getTime() - new Date().getTime()) /
                1000
            );

            // Hiện khi đến giờ bắt đầu
            const startAtTime = new Date(this.product.startAt).getTime();
            const currentTime = new Date().getTime();

            const isExactMatch = startAtTime <= currentTime;
            if (isExactMatch) {
              this.isShowing = true;
            }
            // Đếm giờ bắt đầu
            this.timerConfig = {
              leftTime: stepTimeBid,
            };
            // Người chiến thắng
            // const highestBid = this.product.bids.reduce(
            //   (maxBid: any, currentBid: any) => {
            //     return currentBid.price > maxBid.price ? currentBid : maxBid;
            //   },
            //   this.product.bids[0]
            // );
            // highestBid.isWinBid = true;
            // this.highestBid = highestBid;
            // console.log('Abc', this.highestBid);
          },
          (error) => {
            if (error.status === 400) {
              this.router.navigate(['/notfound']);
            } else {
              this.errorMessage = 'Error loading product details';
              console.error('API Error:', error);
            }
          }
        );
      } else {
        this.router.navigate(['/notfound']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.getPrAndUser();
    // Get user
    this.authService.currentUserData.subscribe((data) => {
      this.userData = data;
    });
    // Get bid
    this.bidSv.getBids().subscribe((response) => {});
  }

  // Tạo phiên đấu giá
  submit() {
    if (this.bidForm.valid) {
      const formValue = this.bidForm.value;
      console.log('Form value', formValue);
      if (this.userData) {
        this.bidSv
          .createBid({
            productId: this.product?._id,
            bids: this.product?.bids.map((bid) => bid._id),
            userId: this.userData._id,
            price: formValue.price,
            bidPriceMax: this.product?.bidPriceMax,
          })

          .subscribe(
            (response) => {
              this.getPrAndUser();
            },
            (error) => {
              console.error('Error creating bid', error);
            }
          );
      } else {
        alert('đăng nhập đã sếp ơi!');
      }
    } else {
      alert('Vui lòng nhập giá và lớn hơn 0!');
    }
  }
}
