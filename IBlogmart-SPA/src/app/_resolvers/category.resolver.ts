import {Injectable} from '@angular/core';
import {Resolve, Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot} from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';

@Injectable()
export class CategoryResolver implements Resolve<Category> {
   constructor(private categoryService: CategoryService,
               private router: Router,
               private alertify: AlertifyService
               ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
       const id = route.params.id;
    //    if (route.url[0].path.lastIndexOf('/') === path.length - 1) {
    //      id = route.params.id;
    //      console.log(id);
    //   }
       return this.categoryService.getcategory(id).pipe(
          catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/admin/category/list']);
            return of(null);

          })

        );
    }

}
