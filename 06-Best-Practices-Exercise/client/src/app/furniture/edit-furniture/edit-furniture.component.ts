import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.css']
})
export class EditFurnitureComponent implements OnInit {
  furnitureForm: FormGroup;
  id: string;

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.furnitureService
      .getSingle(this.id)
      .subscribe(res => {
        this.furnitureForm.patchValue({ ...res });
      });
  }

  initForm(): void {
    this.furnitureForm = new FormGroup({
      'make': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'model': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'year': new FormControl('', [
        Validators.required,
        Validators.min(1950),
        Validators.max(2050)
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      'image': new FormControl('', [
        Validators.required
      ]),
      'material': new FormControl('')
    });
  }

  onSubmit(): void {
    this.furnitureService
      .editSingle(this.id, this.furnitureForm.value)
      .subscribe();
  }

  get make(): AbstractControl {
    return this.furnitureForm.get('make');
  }

  get model(): AbstractControl {
    return this.furnitureForm.get('model');
  }

  get year(): AbstractControl {
    return this.furnitureForm.get('year');
  }

  get description(): AbstractControl {
    return this.furnitureForm.get('description');
  }

  get price(): AbstractControl {
    return this.furnitureForm.get('price');
  }

  get image(): AbstractControl {
    return this.furnitureForm.get('image');
  }

  get material(): AbstractControl {
    return this.furnitureForm.get('material');
  }

}
