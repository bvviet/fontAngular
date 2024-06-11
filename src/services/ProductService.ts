import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../types/productType';
import { ProductFormData } from '../types/productType';
import { Category } from '../types/productType';
import { auth } from '../types/productType';

export interface ApiResponse {
  message: string;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface login {
  message: string;
  data: auth;
  token: string;
}

export interface loginForm {
  email: string | null;
  password: string | null;
}

export interface Categories {
  message: string;
  data: Category[];
}

export interface ApiResponseDetail {
  message: string;
  data: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products'; // Khai báo apiUrl
  http = inject(HttpClient); // Inject biến http
  constructor() {}

  // Lấy danh sách category
  getCategory() {
    return this.http.get<Categories>(`http://localhost:3000/categories`);
  }

  // Hiển thị tất cả sản phẩm
  getProductList(): Observable<ApiResponse> {
    // Đổi kiểu trả về thành Observable<ApiResponse>
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  // Hiển thị sản phẩm có phân trang
  paginationProducts(page: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<ApiResponse>(url);
  }

  // Thêm sản phẩm
  addProduct(data: ProductFormData): Observable<ApiResponseDetail> {
    const url = `${this.apiUrl}`;
    return this.http.post<ApiResponseDetail>(url, data);
  }

  // Sửa sản phẩm
  putProduct(id: string, data: ProductFormData): Observable<ApiResponseDetail> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<ApiResponseDetail>(url, data);
  }

  // Xóa sản phẩm
  deleteProducts(productId: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<ApiResponse>(url);
  }

  // Chi tiết sản phẩm
  getDetail(productId: string): Observable<ApiResponseDetail> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<ApiResponseDetail>(url);
  }

  // Tìm kiếm sản phẩm
  searchProduct(value: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/search?q=${value}`;
    return this.http.get<ApiResponse>(url);
  }

  // Đăng ký
  register(data: auth) {
    return this.http.post<login>('http://localhost:3000/auth/register', data);
  }

  //  Đăng nhập
  login(data: auth) {
    return this.http.post<login>('http://localhost:3000/auth/login', data);
  }
}
