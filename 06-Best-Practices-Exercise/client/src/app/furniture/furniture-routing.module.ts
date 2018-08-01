import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { EditFurnitureComponent } from './edit-furniture/edit-furniture.component';
import { AllFurnitureComponent } from './all-furniture/all-furniture.component';
import { MyFurnitureComponent } from './my-furniture/my-furniture.component';
import { FurnitureDetailsComponent } from './furniture-details/furniture-details.component';

import { IsAdminGuard } from './guards/is-admin.guard';

const furnitureRoutes: Routes = [
  { path: 'create', component: CreateFurnitureComponent },
  { path: 'all', component: AllFurnitureComponent },
  { path: 'myFurniture', component: MyFurnitureComponent },
  { path: 'furniture/details/:id', component: FurnitureDetailsComponent },
  { path: 'furniture/edit/:id', component: EditFurnitureComponent, canActivate: [IsAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(furnitureRoutes)],
  exports: [RouterModule]
})
export class FurnitureRoutingModule { }
