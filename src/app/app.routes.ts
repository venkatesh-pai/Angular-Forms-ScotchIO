import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const AppRoutes: Routes = [
  { path: 'template-form', component: TemplateFormComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' }
];
