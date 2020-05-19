import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  categories: Category[];
  images: Image[];
  type = 'cat';
  catId: number;
  subCatId: number;
  @ViewChild('CatName', {static: false}) catName;
  createForm = new FormGroup({
    categoryName: new FormControl(''),
    isActive: new FormControl(''),
  });



  constructor(private categoryService: CategoryService,
              private alertifyService: AlertifyService,
              private subCategoryService: SubCategoryService,
              private locationService: LocationService,
              private el: ElementRef) { }

  ngOnInit() {
  }

}
