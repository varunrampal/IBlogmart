import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  createForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.createForm = fb.group({
      categoryName: ['', Validators.required],
      isActive: [''],
    });
  }

  ngOnInit() {}
}
