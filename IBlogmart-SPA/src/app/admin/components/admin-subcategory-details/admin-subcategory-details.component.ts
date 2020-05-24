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
import { SubCategoryService } from 'src/app/_services/subcategory.service';

@Component({
  selector: 'app-admin-subcategory-details',
  templateUrl: './admin-subcategory-details.component.html',
  styleUrls: ['./admin-subcategory-details.component.css']
})
export class AdminSubcategoryDetailsComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images: Image[];
  subCategory: Subcategory;
  catId: any;
  subCatId: any;
  category: Category = null;

  constructor( private activatedRoute: ActivatedRoute,
               private categoryService: CategoryService,
               private subCategoryService: SubCategoryService,
               private locationService: LocationService) { }

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


    this.locationService.pagetitle = 'Subcategory details';
    this.activatedRoute.params.subscribe((params) => {
      this.catId = params.catid;
      this.subCatId = params.id;
      this.galleryImages = this.getImages();
      this.category = this.category;
    });
  }

  getImages() {
    const imageUrls = [];
    this.subCategoryService.getcategory(this.subCatId).subscribe((res) => {
      this.subCategory = res;
      console.log(res);
      const imgObj = res.images.find((img) => img.isMain === true && img.type === 1);

      if (imgObj != null && imgObj.isMain === true) {
        this.subCategory.mainImageUrl = imgObj.url;
      } else {
        this.subCategory.mainImageUrl = '/assets/img/noimage.png';
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
