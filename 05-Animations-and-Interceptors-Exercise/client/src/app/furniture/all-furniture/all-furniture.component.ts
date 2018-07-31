import { Component, OnInit } from '@angular/core';

import { FurnitureService } from '../furniture.service';
import { Furniture } from '../models/furniture.model';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Furniture[];

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit(): void {
    this.furnitureService
      .getAll()
      .subscribe(res => {
        this.furnitures = res;
      });
  }

}
