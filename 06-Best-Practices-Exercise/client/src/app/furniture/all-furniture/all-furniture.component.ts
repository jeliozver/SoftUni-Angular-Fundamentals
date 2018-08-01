import { Component, OnInit } from '@angular/core';

import { FurnitureService } from '../furniture.service';
import { AuthService } from '../../authentication/auth.service';
import { Furniture } from '../models/furniture.model';
import { AuthenticationModule } from '../../authentication/authentication.module';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Furniture[];
  pageSize = 3;
  currentPage = 1;

  constructor(
    private furnitureService: FurnitureService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.furnitureService
      .getAll()
      .subscribe(res => {
        this.furnitures = res;
      });
  }

  pageChanged(newPage: number): void {
    this.currentPage = newPage;
  }

}
