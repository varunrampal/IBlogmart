import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcategoryDetailsComponent } from './admin-subcategory-details.component';

describe('AdminSubcategoryDetailsComponent', () => {
  let component: AdminSubcategoryDetailsComponent;
  let fixture: ComponentFixture<AdminSubcategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
