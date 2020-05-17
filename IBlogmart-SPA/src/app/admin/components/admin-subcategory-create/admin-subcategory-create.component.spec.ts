import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcategoryCreateComponent } from './admin-subcategory-create.component';

describe('AdminSubcategoryCreateComponent', () => {
  let component: AdminSubcategoryCreateComponent;
  let fixture: ComponentFixture<AdminSubcategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
