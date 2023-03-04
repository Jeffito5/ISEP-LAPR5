import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGestorArmazem } from './gestor-armazem/armazem/menu-gestor-armazem-component'; 
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: 'master', component: MenuGestorArmazem },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
