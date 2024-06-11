// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<any>(
    this.getUserDataFromLocalStorage()
  );
  currentUserData = this.userDataSubject.asObservable();

  updateUserData(data: any) {
    this.userDataSubject.next(data);
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserDataFromLocalStorage() {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
