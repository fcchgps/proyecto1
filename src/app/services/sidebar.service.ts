import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[{
    titulo:'Maestros',
    icono:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {titulo:'Usuarios', url:'usuarios', icono:'fa fa-users'},
      {titulo:'Productos', url:'productos', icono:'fa fa-cubes'},
      {titulo:'Clientes', url:'clientes', icono:'fa fa-users'},
      
    ]
  },
  {
    titulo:'Procesos',
    icono:'nav-icon fas fa-server',
    submenu:[
      {titulo:'Ventas', url:'ventas', icono:'fa fa-users'},
      {titulo:'Compras', url:'compras', icono:'fa fa-cubes'},
      {titulo:'Libros Contables', url:'clientes', icono:'fa fa-cubes'},
      
    
    ]
  },
  {
    titulo:'Contabilidad',
    icono:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {titulo:'Tipo Cambio', url:'ventas', icono:'fa fa-users'},
      {titulo:'Periodo Contable', url:'compras', icono:'fa fa-cubes'},
      {titulo:'Auxiliares', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Registro Asiento', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Aplicacion Doc', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Doble Asiento', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Ajustes', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Cuentas por Cobrar', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Cuentas por Pagar', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Caja Bancos', url:'clientes', icono:'fa fa-cubes'},
      {titulo:'Auxiliares', url:'clientes', icono:'fa fa-cubes'},
      
    
    ]
  }]

}
