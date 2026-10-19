import { Routes } from '@angular/router';
import { CatalogoComponent } from './features/catalog/catalog';
import { FormularioComponent } from './features/form/form';
import { Details } from './features/details/details';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'agregar', component: FormularioComponent },
  { path: 'detalles/:id', component: Details },
  { path: '**', redirectTo: 'catalogo' }
];