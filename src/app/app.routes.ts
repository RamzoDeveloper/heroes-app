import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import('./features/heroes/heroes.router').then((m) => m.HEROES_ROUTES),
  },
  { path: '**', redirectTo: 'heroes' },
];
