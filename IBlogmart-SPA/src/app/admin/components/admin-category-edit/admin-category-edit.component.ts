import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/category';
import { Image } from '../../../_models/image';
import { AlertifyService } from 'src/app/_services/alertify.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
      categoryService.getcategory(params.id).subscribe((res) => {
        this.category = res;
        this.images = this.category.images;
        const imgObj = res.images.find((img) => img.isMain === true);
        if (imgObj != null) {
          this.category.mainImageUrl = imgObj.url;
        } else {
          this.category.mainImageUrl =  '/assets/img/noimage.png';
        }

      });
    });
  }

  ngOnInit() {}

  updateMainImage(imageUrl: string) {
     this.category.mainImageUrl = imageUrl;

  }

 
}
