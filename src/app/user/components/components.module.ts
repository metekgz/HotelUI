import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { RoomsModule } from './rooms/rooms.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    RoomsModule,
    HomeModule,
    RegisterModule,
    // LoginModule
  ],
})
export class ComponentsModule {}
