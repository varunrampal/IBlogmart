import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcategoryListComponent } from './admin-subcategory-list.component';

describe('AdminSubcategoryListComponent', () => {
  let component: AdminSubcategoryListComponent;
  let fixture: ComponentFixture<AdminSubcategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
