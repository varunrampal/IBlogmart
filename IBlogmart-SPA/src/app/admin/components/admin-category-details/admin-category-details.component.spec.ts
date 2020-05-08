import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryDetailsComponent } from './admin-category-details.component';

describe('AdminCategoryDetailsComponent', () => {
  let component: AdminCategoryDetailsComponent;
  let fixture: ComponentFixture<AdminCategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
