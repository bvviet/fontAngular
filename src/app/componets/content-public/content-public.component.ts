import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/ProductService';
import Product from '../../../types/productType';
import { ApiResponse } from '../../../services/ProductService';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-content-public',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './content-public.component.html',
  styleUrls: ['./content-public.component.css'],
})
export class ContentPublicComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  page: number = 1;
  totalPages: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nghe sự kiện thay đổi query parameters
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // Cập nhật searchTerm từ query parameters
      this.searchTerm = params['q'] || '';
      // Gọi hàm tìm kiếm sản phẩm hoặc load sản phẩm với phân trang
      if (this.searchTerm.trim() !== '') {
        this.searchProducts();
      } else {
        this.loadProducts();
        this.loadProductsWithPagination();
      }
    });
  }

  searchProducts(): void {
    this.productService.searchProduct(this.searchTerm).subscribe(
      (response: ApiResponse) => {
        this.products = response.data;
        if (response.pagination) {
          this.totalPages = response.pagination.totalPages;
        }
        console.log(this.products);
        // if (this.products.length == 0) {
        //   this.router.navigate(['notfound']);
        // }
      },
      (error) => {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProductList().subscribe(
      (response: ApiResponse) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
      }
    );
  }

  loadProductsWithPagination(): void {
    this.productService.paginationProducts(this.page).subscribe(
      (response: ApiResponse) => {
        this.products = response.data;
        if (response.pagination) {
          this.totalPages = response.pagination.totalPages;
        }
        console.log(this.products);
      },
      (error) => {
        console.error('Lỗi khi tải danh sách sản phẩm với phân trang:', error);
      }
    );
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProductsWithPagination();
      console.log(this.page);
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProductsWithPagination();
      console.log(this.page);
    }
  }
}
