import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './user/components/home/home.component';

const routes: Routes = [
  {path:"admin", component:LayoutComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren:()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule)},
    {path:"products",loadChildren:()=> import("./admin/components/products/products.module").then(module => module.ProductsModule)},
    {path:"rooms",loadChildren:()=> import("./admin/components/rooms/rooms.module").then(module => module.RoomsModule)}
  ]},
  {path:"",component:HomeComponent},
  {path:"products",loadChildren:()=> import("./user/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"rooms",loadChildren:()=> import("./user/components/rooms/rooms.module").then(module=>module.RoomsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
