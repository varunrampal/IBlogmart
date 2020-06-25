import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
     fixture = TestBed.createComponent(TestComponent);
    // component = fixture.componentInstance;
     component = new TestComponent(new FormBuilder());

     fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with 2 controls', () => {
     expect(component.createForm.contains('categoryName')).toBeTruthy();
     expect(component.createForm.contains('isActive')).toBeTruthy();

  });

  it('should make the category name control required', () => {
    let control =   component.createForm.get('categoryName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
});
