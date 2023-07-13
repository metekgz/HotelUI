import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './user/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {path:"admin", component:LayoutComponent,children:[
    {path:"",component:DashboardComponent,canActivate:[AuthGuard]},
    {path:"customers",loadChildren:()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule),canActivate:[AuthGuard]},
    {path:"products",loadChildren:()=> import("./admin/components/products/products.module").then(module => module.ProductsModule),canActivate:[AuthGuard]},
    {path:"rooms",loadChildren:()=> import("./admin/components/rooms/rooms.module").then(module => module.RoomsModule),canActivate:[AuthGuard]},
  ],canActivate:[AuthGuard]},
  {path:"",component:HomeComponent},
  {path:"products",loadChildren:()=> import("./user/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"products/:pageNo",loadChildren:()=> import("./user/components/products/products.module").then(module => module.ProductsModule)},
  {path:"rooms",loadChildren:()=> import("./user/components/rooms/rooms.module").then(module=>module.RoomsModule)},
  {path:"register",loadChildren:()=> import("./user/components/register/register.module").then(module => module.RegisterModule)},
  {path:"login",loadChildren:()=> import("./user/components/login/login.module").then(module => module.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
