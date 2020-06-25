import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SubCategoryService } from 'src/app/_services/subcategory.service';
import { Category } from 'src/app/_models/category';
import { Image } from '../../../_models/image';
import { LocationService } from 'src/app/_services/location.service';


@Component({
  selector: 'app-admin-category-create',
  templateUrl: './admin-category-create.component.html',
  styleUrls: ['./admin-category-create.component.css']
})
export class AdminCategoryCreateComponent implements OnInit {
  category: Category;
  images: Image[];
  type = 'cat';
  catId: number;
  id = 0;
  categoryExists: false;
  nameExists = false;
  empty = false;
  createForm: FormGroup;

  // createForm = new FormGroup({
  //   categoryName: new FormControl(''),
  //   isActive: new FormControl(''),
  // });



  constructor(private categoryService: CategoryService,
              private alertifyService: AlertifyService,
              private subCategoryService: SubCategoryService,
              private locationService: LocationService,
              private el: ElementRef,
              private fb: FormBuilder) {

                this.createForm = fb.group({
                  categoryName: [''],
                  isActive: ['']
                });
               }

  ngOnInit() {
    this.locationService.pagetitle = 'Create Category';
  }

  onSubmit() {

     const catToCreate: Category = {
      name:   this.createForm.value.categoryName,
      active: this.createForm.value.isActive,
   };

     this.categoryService.create(catToCreate).subscribe((category) => {

      if (category != null) {
         if (category.id > 0) {
           this.category = category;
           this.images = this.category.images;

           this.catId =  this.category.id;
           this.alertifyService.success('Category created successfully');
         }

        } else {
          this.alertifyService.error('Failed to create category');
        }
    }, error => {
        this.alertifyService.error('Failed to create category');
    });

  }

  isNameExists(isExists: boolean) {
    this.nameExists = isExists;
    console.log('nameExists' + isExists);
    if (isExists) {
      this.alertifyService.error('Category already exists');
    }
  }

  isEmpty(empty: boolean) {
     this.empty = empty;
     if (empty) { this.alertifyService.error('Please enter category'); }

  }

  updateMainImage(imageUrl: string) {
    this.category.mainImageUrl = imageUrl;

 }

}
