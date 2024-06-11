import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  userData: any;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.currentUserData.subscribe((data) => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
