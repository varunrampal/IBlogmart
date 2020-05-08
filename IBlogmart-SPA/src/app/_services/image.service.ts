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
export class ImageService {
  baseUrl =  environment.apiUrl + 'image/';

  constructor(private http: HttpClient) { }

  setMainImage(imageId: number, Id: number, type: string) {

    return this.http.post(this.baseUrl + 'setmain/' + Id + '/' + imageId + '/' + type, {}, httppOtions);


  }
}
