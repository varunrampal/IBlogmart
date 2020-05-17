import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from 'ngx-gallery';
import { Image } from 'src/app/_models/image';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/category';
import { LocationService } from 'src/app/_services/location.service';
import { Subcategory } from 'src/app/_models/subcategory';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin-category-details',
  templateUrl: './admin-category-details.component.html',
  styleUrls: ['./admin-category-details.component.css'],
})
export class AdminCategoryDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images: Image[];
  subCategories: Subcategory[];
  catId: any;
  category: Category = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private locationService: LocationService
  ) {}

  ngOnInit() {

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];


    this.locationService.pagetitle = 'Category details';
    this.activatedRoute.params.subscribe((params) => {
      this.catId = params.id;
      this.galleryImages = this.getImages();
      this.category = this.category;
    });



  }
  getImages() {
    const imageUrls = [];
    this.categoryService.getcategory(this.catId).subscribe((res) => {
      this.category = res;
      // console.log(res);

      this.subCategories = this.category.subCategories;

      const imgObj = res.images.find((img) => img.isMain === true);

      if (imgObj != null && imgObj.isMain === true) {
        this.category.mainImageUrl = imgObj.url;
      } else {
        this.category.mainImageUrl = '/assets/img/noimage.png';
      }

      res.images.map((img) => {
        imageUrls.push({
          small: img.url,
          medium: img.url,
          big: img.url,
        });
      });
    });
    return imageUrls;
  }
}
