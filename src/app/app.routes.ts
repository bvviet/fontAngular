import { Routes } from '@angular/router';
import { AdminComponent } from './Layout/admin/admin.component';
import { SidebarComponent } from './componets/sidebar/sidebar.component';
import { ContentComponent } from './componets/content/content.component';
import { NotfoundComponent } from './componets/notfound/notfound.component';
import { AddComponent } from './pages/add/add.component';
import { UpdateComponent } from './pages/update/update.component';
import { PublicComponent } from './Layout/public/public.component';
import { ContentPublicComponent } from './componets/content-public/content-public.component';
import { DetailPublicComponent } from './componets/detail-public/detail-public.component';
import { RegisterComponent } from './componets/register/register.component';
import { LoginComponent } from './componets/login/login.component';
import { AuthGuard } from '../auth.guard';
import { BidsListComponent } from './componets/bids-list/bids-list.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContentComponent,
      },
      {
        path: 'list',
        component: ContentComponent,
      },
      {
        path: 'sidebar',
        component: SidebarComponent,
      },
      {
        path: 'notfound',
        component: NotfoundComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'update/:id',
        component: UpdateComponent,
      },
      {
        path: 'detail/:id',
        component: DetailPublicComponent,
      },
      {
        path: 'search',
        component: ContentComponent,
      },
      {
        path: ':id/bidsList',
        component: BidsListComponent,
      },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: ContentPublicComponent,
      },
      {
        path: 'detail/:id',
        component: DetailPublicComponent,
      },
      {
        path: 'notfound',
        component: NotfoundComponent,
      },
      {
        path: 'search',
        component: ContentPublicComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
