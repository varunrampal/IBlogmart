import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageEditorComponent } from './admin-image-editor.component';

describe('AdminImageEditorComponent', () => {
  let component: AdminImageEditorComponent;
  let fixture: ComponentFixture<AdminImageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
