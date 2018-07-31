import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FurnitureService } from '../furniture.service';
import { Furniture } from '../models/furniture.model';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furniture: Furniture;

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.furnitureService
      .getSingle(id)
      .subscribe(res => {
        this.furniture = res;
      });
  }

}
