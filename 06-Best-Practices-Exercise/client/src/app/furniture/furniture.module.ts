import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { furnitureComponents } from './index';
import { FurnitureRoutingModule } from './furniture-routing.module';
import { FurnitureService } from './furniture.service';

@NgModule({
  declarations: [
    ...furnitureComponents
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FurnitureRoutingModule
  ],
  providers: [
    FurnitureService
  ]
})
export class FurnitureModule { }
