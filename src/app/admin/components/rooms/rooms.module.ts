import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoomsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RoomsComponent }]),
  ],
})
export class RoomsModule {}
