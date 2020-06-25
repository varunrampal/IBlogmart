import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from '../../../../../node_modules/ngx-bootstrap/tabs';

import { AdminCategoryCreateComponent } from './admin-category-create.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IsalreadyexistsDirective } from 'src/app/_directives/isalreadyexists.directive';
import { AdminImageEditorComponent } from '../../shared/admin-image-editor/admin-image-editor.component';
import { CategoryService } from 'src/app/_services/category.service';
import { SubCategoryService } from 'src/app/_services/subcategory.service';
import { LocationService } from 'src/app/_services/location.service';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/_services/alertify.service';

describe('AdminCategoryCreateComponent', () => {
  let component: AdminCategoryCreateComponent;
  let fixture: ComponentFixture<AdminCategoryCreateComponent>;
  let categoryService: CategoryService;
  let subCategoryService: SubCategoryService;
  let alertifyService: AlertifyService;
  let locationService: LocationService;
  let el: ElementRef;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryCreateComponent,
         IsalreadyexistsDirective,
          AdminImageEditorComponent ],
      imports: [ReactiveFormsModule, TabsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryCreateComponent);
    //component = fixture.componentInstance;
    categoryService = new CategoryService(null);
    subCategoryService = new SubCategoryService(null);
    alertifyService = new AlertifyService();
    locationService = new LocationService();
    el = new ElementRef(null);
    fb = new FormBuilder();

    component = new AdminCategoryCreateComponent(categoryService,
                     alertifyService ,
                     subCategoryService,
                     locationService,
                     el,
                     fb);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should creat a form with 2 controls', () => {
     expect(component.createForm.contains('categoryName')).toBeTruthy();
     expect(component.createForm.contains('isActive')).toBeTruthy();
  });
});
