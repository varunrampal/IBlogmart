import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SubCategoryService } from 'src/app/_services/subcategory.service';
import { Category } from 'src/app/_models/category';
import { Image } from '../../../_models/image';
import { Subcategory } from 'src/app/_models/subcategory';
import { LocationService } from 'src/app/_services/location.service';


@Component({
  selector: 'app-admin-subcategory-create',
  templateUrl: './admin-subcategory-create.component.html',
  styleUrls: ['./admin-subcategory-create.component.css']
})
export class AdminSubcategoryCreateComponent implements OnInit, AfterViewInit {

  constructor(private categoryService: CategoryService,
              private alertifyService: AlertifyService,
              private subCategoryService: SubCategoryService,
              private locationService: LocationService,
              private el: ElementRef ) { }

  categories: Category[];
  subCategory: Subcategory;
  images: Image[];
  type = 'subcat';
  catId: number;
  subCatId: number;

  @ViewChild('subCatName', {static: false}) subCatName;
  createForm = new FormGroup({
    categoryId: new FormControl(''),
    subCategoryName: new FormControl(''),
    isActive: new FormControl(''),
  });

  ngOnInit() {
    this.locationService.pagetitle = 'Create Subcategory';
    this.categoryService.getall().subscribe((data) => {
    this.categories = data;
    });
  }

  ngAfterViewInit() {
  // console.log(""+this.subCatName.nativeElement.value);
  }

  onSubmit() {

    const subCatToCreate: Subcategory = {
      name:   this.createForm.value.subCategoryName,
      categoryId: this.createForm.value.categoryId,
      active: this.createForm.value.isActive,
   };

    this.subCategoryService.create(subCatToCreate).subscribe((subCategory) => {

      if (subCategory != null) {
         if (subCategory.id > 0) {
           this.subCategory = subCategory;
           this.images = this.subCategory.images;

           this.catId =  this.subCategory.categoryId;
           this.subCatId =  this.subCategory.id;

           console.log('catId:' + this.catId + 'subcatId:' + this.subCatId);

           this.alertifyService.success('SubCategory Created successfully');
         }

        } else {
          this.alertifyService.error('Failed to create subcategory');
        }
    }, error => {
        this.alertifyService.error('Failed to create subcategory');
    });
  }

  filterCategories(val: any) {

   
    this.createForm.patchValue({
      categoryId: val
    });
  }

  checkCategoryName() {
     const subCatName = this.subCatName.nativeElement.value;
  }
  updateMainImage(imageUrl: string) {
    this.subCategory.mainImageUrl = imageUrl;

 }
}
