import { Routes } from '@angular/router';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroFormComponent } from './pages/hero-form/hero-form.component';

export const HEROES_ROUTES: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'hero/:id', component: HeroFormComponent },
  { path: 'hero', component: HeroFormComponent },
];
