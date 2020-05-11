import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { Image } from '../../../_models/image';
import { ImageService } from 'src/app/_services/image.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { __importDefault } from 'tslib';

const URL = environment.apiUrl;
@Component({
  selector: 'app-admin-image-editor',
  templateUrl: './admin-image-editor.component.html',
  styleUrls: ['./admin-image-editor.component.css']
})
export class AdminImageEditorComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  id: number;
  currentMain: Image;
  @Input() images: Image[];
  @Input() type: string;
  @Output() getImageChange = new EventEmitter<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private alertifyService: AlertifyService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {

    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: URL + 'category/' +  this.id + '/0/Image',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
   // this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
   // this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => {

      // if (response) {

      //   const res: Image = JSON.parse(response);
      //   const image = {
      //      id: res.id,
      //      url: res.url,
      //      isMain: res.isMain
      //    };
      //   this.images.push(image);
      // }


      this.categoryService.getcategory(this.id).subscribe((res) => {
        this.images = res.images;
      });
    };
  }

  onSuccessItem(item: FileItem, response: any, status: number, headers: ParsedResponseHeaders): any {
  //  let data = JSON.parse(response); //success server response
    console.log('sucess' + response);

    // if(response === '')
    // {
    //   console.log('suresponse is emptycess' + response);
    // }
}

onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const error = JSON.parse(response); // error server response
    console.log('error' + error);
}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainImage(image: Image) {
    this.imageService.setMainImage(image.id, this.id, this.type).subscribe(() => {
       this.currentMain = this.images.filter(i => i.isMain === true)[0];
       if (this.currentMain != null) {
            this.currentMain.isMain = false;
        }
       image.isMain = true;
       this.getImageChange.emit(image.url);

    }, error => {
       this.alertifyService.error('Failed to set as main image');

    });
  }

  deleteImage(id: number) {

    this.alertifyService.confirm('Are you sure you want to delete this image?', () => {
      this.categoryService.deleteImage(id).subscribe(() => {

        this.images.splice(this.images.findIndex( i => i.id === id ), 1);
        this.alertifyService.success('Image has been deleted');
      }, error => {

        this.alertifyService.error('Failed to delete image');
      });

    });
  }
}
