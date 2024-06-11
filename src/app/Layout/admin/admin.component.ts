import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../componets/sidebar/sidebar.component';
import { ContentComponent } from '../../componets/content/content.component';
// import { HeaderComponent } from '../../componets/header/header.component';
import { HeaderPublicComponent } from '../../componets/header-public/header-public.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    ContentComponent,
    HeaderPublicComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
