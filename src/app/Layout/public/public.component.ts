import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPublicComponent } from '../../componets/header-public/header-public.component';
import { ContentPublicComponent } from '../../componets/content-public/content-public.component';
import { FooterPublicComponent } from '../../componets/footer-public/footer-public.component';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderPublicComponent,
    ContentPublicComponent,
    FooterPublicComponent,
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent {}
