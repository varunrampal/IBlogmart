import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../_models/category';
import { Image } from '../_models/image';


const httppOtions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl =  environment.apiUrl + 'category/';

constructor(private http: HttpClient) { }

// get all categories
getall(): Observable<Category[]> {
  return this.http.get<Category[]>(this.baseUrl + 'getall', httppOtions);
 }

 // get category images
getcategoryimages(catId: number): Observable<Image[]> {
  return this.http.get<Image[]>(this.baseUrl + catId + '/images', httppOtions);
 }

 // get category details
 getcategory(catId: number): Observable<Category> {
  return this.http.get<Category>(this.baseUrl + 'getcategory/' + catId, httppOtions);
 }

 updatecategory(category: Category) {
     return this.http.put(this.baseUrl + 'updatecategory', category, httppOtions);
 }

 deleteImage(id: number) {
 return this.http.delete(environment.apiUrl + 'image/delete/' + id, httppOtions);

 }
}
