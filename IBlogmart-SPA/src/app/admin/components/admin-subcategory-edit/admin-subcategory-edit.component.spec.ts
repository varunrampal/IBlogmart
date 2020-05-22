import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcategoryEditComponent } from './admin-subcategory-edit.component';

describe('AdminSubcategoryEditComponent', () => {
  let component: AdminSubcategoryEditComponent;
  let fixture: ComponentFixture<AdminSubcategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
