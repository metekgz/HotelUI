import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    RoomsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:RoomsComponent}])
  ]
})
export class RoomsModule { }
