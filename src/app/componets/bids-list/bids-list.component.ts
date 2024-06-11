import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/ProductService';
import { BidService } from '../../../services/bid.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import Product from '../../../types/productType';
@Component({
  selector: 'app-bids-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './bids-list.component.html',
  styleUrl: './bids-list.component.css',
})
export class BidsListComponent {
  productService = inject(ProductService);
  bidService = inject(BidService);
  route = inject(ActivatedRoute);
  productId!: string;
  bidsDetail!: Product | undefined;

  getData(id: string) {
    if (this.productId) {
      this.productService.getDetail(this.productId).subscribe({
        next: (response) => {
          this.bidsDetail = response.data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getData(this.productId);
    });
  }

  handleSetBid(id: string) {
    this.bidService.updateBid(id, true).subscribe({
      next: (data) => {
        this.bidsDetail = data as Product;
        this.getData(this.productId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
