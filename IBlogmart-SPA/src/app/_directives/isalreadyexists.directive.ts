import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { SubCategoryService } from '../_services/subcategory.service';

@Directive({
  selector: '[appIsalreadyexists]',
})
export class IsalreadyexistsDirective {
  @Input() appIsalreadyexists: boolean;
  @Input() entityId: number;
  @Input() entityType: string;
  @Output() isNameExists = new EventEmitter<boolean>();
  @Output() isEmpty = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef,
    private categoryService: CategoryService,
    private subCategoruService: SubCategoryService
  ) {}
  @HostListener('blur') onblur() {
    this.el.nativeElement.style.color = 'black';
    this.highlight('red');
  }

  private highlight(color: string) {
    if (this.el.nativeElement.value.trim() === '') {
      this.isEmpty.emit(true);
    } else {
      this.isEmpty.emit(false);
    }

    if (this.el.nativeElement.value.trim() !== '') {

      const enteredValue = this.el.nativeElement.value.toLowerCase();

      if (this.entityType === 'cat') {
        this.categoryService
          .isalreadyexists(enteredValue, this.entityId)
          .subscribe((isExists) => {
            this.isNameExists.emit(isExists);

            if (isExists) {
              this.el.nativeElement.style.color = color;
            }
          });
      }

      if (this.entityType === 'subcat') {
        this.subCategoruService
        .isalreadyexists(enteredValue, this.entityId)
        .subscribe((isExists) => {
          this.isNameExists.emit(isExists);

          if (isExists) {
            this.el.nativeElement.style.color = color;
          }
        });
       }
    }
  }
}
