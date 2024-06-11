import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-public',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-public.component.html',
  styleUrl: './header-public.component.css',
})
export class HeaderPublicComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  search(keyword: string): void {
    const currentUrl = this.router.url;
    let searchUrl = '/search';

    if (currentUrl.includes('/admin')) {
      searchUrl = '/admin/search';
    }

    console.log('Keyword:', keyword);
    this.router.navigateByUrl(`${searchUrl}?q=${keyword}`);
  }
}
