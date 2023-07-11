import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { AuthGuard } from '../guards/auth.guard';
import { ClientesComponent } from './clientes/clientes.component';


const routes:Routes=[
  {path:'dashboard', component:PagesComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component:DashboardComponent, data:{titulo:'Dashboard'}}, 
    {path:'usuarios', component:UsuariosComponent,data:{titulo:'Usuarios'}},
    {path:'productos', component:ProductosComponent, data:{titulo:'Productos'}},
    {path:'clientes', component:ClientesComponent, data:{titulo:'Clientes'}}
  ]
}
]


@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
