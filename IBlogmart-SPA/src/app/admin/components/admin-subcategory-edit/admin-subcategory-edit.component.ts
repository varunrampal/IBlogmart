import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SubCategoryService } from 'src/app/_services/subcategory.service';
import { Category } from 'src/app/_models/category';
import { Image } from '../../../_models/image';
import { Subcategory } from 'src/app/_models/subcategory';
import { LocationService } from 'src/app/_services/location.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-subcategory-edit',
  templateUrl: './admin-subcategory-edit.component.html',
  styleUrls: ['./admin-subcategory-edit.component.css'],
})
export class AdminSubcategoryEditComponent implements OnInit {
  categories: Category[];
  subCategory: Subcategory;
  images: Image[];
  type = 'subcat';
  catId: number;
  subCatId: number;
  categoryExists: false;
  nameExists = false;
  empty = false;

  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
    private subCategoryService: SubCategoryService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef
  ) {}

  editForm = new FormGroup({
    categoryId: new FormControl(''),
    subCategoryName: new FormControl(''),
    isActive: new FormControl(''),
  });

  ngOnInit() {
    this.locationService.pagetitle = 'Edit Subcategory';

    this.activatedRoute.params.subscribe((parms) => {
      this.subCatId = parms.id;
      this.catId = parms.catid;

      this.subCategoryService.getcategory(this.subCatId).subscribe(
        (data) => {
          this.subCategory = data;

          this.editForm.patchValue({
            subCategoryName: this.subCategory.name,
            isActive: this.subCategory.active,
          });

          this.images = [];

          console.log(this.subCategory.images);
          this.subCategory.images.map((image) => {
            if (image.type === 1) {
              this.images.push(image);
            }
          });
          const imgObj = data.images.find((img) => img.isMain === true);
          if (imgObj != null) {
            this.subCategory.mainImageUrl = imgObj.url;
          } else {
            this.subCategory.mainImageUrl = '/assets/img/noimage.png';
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });

    this.categoryService.getall().subscribe((data) => {
      this.categories = data;
    });
  }

  isNameExists(isExists: boolean) {
    this.nameExists = isExists;
    console.log('nameExists' + isExists);
    if (isExists) {
      this.alertifyService.error(
        'Subcategory with the same name already exists'
      );
    }
  }

  isEmpty(empty: boolean) {
    this.empty = empty;
    if (empty) {
      this.alertifyService.error('Please enter subcategory name');
    }
  }
  onSubmit() {
    const subCatToUpdate: Subcategory = {
      id: this.subCatId,
      name: this.editForm.value.subCategoryName,
      categoryId: this.editForm.value.categoryId,
      active: this.editForm.value.isActive,
    };

    this.subCategoryService.update(subCatToUpdate).subscribe(
      () => {
        this.alertifyService.success('Subcategory updated successfully');
      },
      (error) => {
        this.alertifyService.error('Failed to update Subcategory');
      }
    );
  }
  updateMainImage(imageUrl: string) {
    this.subCategory.mainImageUrl = imageUrl;
  }
}
