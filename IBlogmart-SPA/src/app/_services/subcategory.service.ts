import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Subcategory } from '../_models/subcategory';
import { Image } from '../_models/image';

const httppOtions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };


@Injectable({
      providedIn: 'root'
  })
  export class SubCategoryService {
    baseUrl =  environment.apiUrl + 'subcategory/';

  constructor(private http: HttpClient) { }

  // create subcategories
  create(subCategory: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.baseUrl + 'create', subCategory, httppOtions);
   }

   getimages(id: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseUrl + 'images/' + id, httppOtions);

   }

   getcategory(id: number): Observable<Subcategory> {

    return this.http.get<Subcategory>(this.baseUrl + 'get/' + id, httppOtions);
   }

   update(suCategory: Subcategory) {
    return this.http.put(this.baseUrl + 'update', suCategory, httppOtions);
}

   
   isalreadyexists(name: string, id: number) {
    return this.http.get<boolean>(this.baseUrl + 'exists/' + name + '/' + id, httppOtions);
  }
}
