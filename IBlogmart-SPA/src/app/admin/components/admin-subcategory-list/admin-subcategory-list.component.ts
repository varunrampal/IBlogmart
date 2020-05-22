import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from 'src/app/_services/subcategory.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/_services/location.service';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { Subcategory } from 'src/app/_models/subcategory';

@Component({
  selector: 'app-admin-subcategory-list',
  templateUrl: './admin-subcategory-list.component.html',
  styleUrls: ['./admin-subcategory-list.component.css'],
})
export class AdminSubcategoryListComponent implements OnInit {
  categories: Category[];
  subCategories: Subcategory[];
  catSelected = false;
  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationService.pagetitle = 'Subcategory List';
    this.categoryService.getall().subscribe((data) => {
      this.categories = data;
    });
  }

  filterCategories(val: any) {
    if ( val > 0) {this.catSelected = true;}
    this.categoryService.getcategory(val).subscribe((data) => {
        this.subCategories = data.subCategories;
        this.subCategories.map((res) => {

          if (res.images == null) {
            res.mainImageUrl =  '/assets/img/noimage.png';
          } else {
            const imgObj = res.images.find((img) => img.isMain === true && img.type === 1);
          
            if (imgObj != null) {
              res.mainImageUrl = imgObj.url;
            } else {
              res.mainImageUrl =  '/assets/img/noimage.png';
            }
          }

        });

    });
  }

  createsubcategory() {
    this.router.navigate(['/admin/subcategory/create']);

  }

}
