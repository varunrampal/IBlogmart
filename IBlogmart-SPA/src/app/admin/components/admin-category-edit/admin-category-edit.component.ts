import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/category';
import { Image } from '../../../_models/image';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LocationService } from 'src/app/_services/location.service';

const URL = environment.apiUrl;
@Component({
  selector: 'app-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
  styleUrls: ['./admin-category-edit.component.css'],
})
export class AdminCategoryEditComponent implements OnInit {
   id: number;
   category: Category;
   images: Image[];
   type = 'cat';
   categoryExists: false;
   nameExists = false;
   empty = false;
   editForm = new FormGroup({
    categoryName: new FormControl(''),
    isActive: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private locationService: LocationService) {

      this.route.data.subscribe((data) => {
        
        this.activatedRoute.params.subscribe((params) => {
          this.id = params.id;
        });

        this.category = data.category;

        this.editForm.setValue({
          categoryName: this.category.name,
          isActive: this.category.active

         });
        this.images = [];
        this.category.images.map(image => {
              if (image.type === 0) {
                this.images.push(image);
              }

        });
        const imgObj = data.category.images.find((img) => img.isMain === true);
        if (imgObj != null) {
          this.category.mainImageUrl = imgObj.url;
        } else {
          this.category.mainImageUrl =  '/assets/img/noimage.png';
        }


      });

     // old code

    //   this.activatedRoute.params.subscribe((params) => {
    //   this.id = params.id;
    //   categoryService.getcategory(params.id).subscribe((res) => {
    //     this.category = res;
    //     this.editForm.setValue({
    //       categoryName: this.category.name,
    //       isActive: this.category.active

    //      });
    //     this.images = [];
    //     this.category.images.map(image => {
    //           if (image.type === 0) {
    //             this.images.push(image);
    //           }

    //     });
    //     const imgObj = res.images.find((img) => img.isMain === true);
    //     if (imgObj != null) {
    //       this.category.mainImageUrl = imgObj.url;
    //     } else {
    //       this.category.mainImageUrl =  '/assets/img/noimage.png';
    //     }

    //   });
    // });
  }

 ngOnInit() {
  this.locationService.pagetitle = 'Category Edit';
  }

  updateMainImage(imageUrl: string) {
     this.category.mainImageUrl = imageUrl;

  }

  isNameExists(isExists: boolean) {
    this.nameExists = isExists;
    console.log('nameExists' + isExists);
    if (isExists) {
      this.alertify.error('Category with the same name already exists');
    }
  }

  isEmpty(empty: boolean) {
     this.empty = empty;
     if (empty) { this.alertify.error('Please enter category name'); }

  }

  onSubmit() {

    const catId = this.id;
    const catName = this.editForm.value.categoryName;
    const active = this.editForm.value.isActive;

    this.category.id = catId;
    this.category.name = catName;
    this.category.active = active;

    this.categoryService.updatecategory(this.category).subscribe(() => {
      this.alertify.success('Category updated successfully');

    }, error => {
        this.alertify.error('Failed to update category');
    });
    // const name = this.editForm.value
    // const category: Category = { name: this.}

  }


}
