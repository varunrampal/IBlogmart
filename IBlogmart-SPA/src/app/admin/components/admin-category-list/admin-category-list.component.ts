import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { LocationService } from 'src/app/_services/location.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css'],
})
export class AdminCategoryListComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationService.pagetitle = 'Category List';
    this.route.data.subscribe((data) => {
      this.categories = data.categories;
      // console.log(data);
      this.categories.map((res) => {
        const imgObj = res.images.find((img) => img.isMain === true);
        if (imgObj != null) {
          res.mainImageUrl = imgObj.url;
        } else {
          res.mainImageUrl =  '/assets/img/noimage.png';
        }
      });
     
    });
  }

  deleteCategory(id: number) {
    console.log(id);
  }

  createCategory()
  {
    this.router.navigate(['/admin/category/create']);
  }
}
