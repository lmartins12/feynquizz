import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'config',
    loadChildren: () => import('./features/config/config.routes').then((m) => m.CONFIG_ROUTES),
  },
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full',
  },
];
