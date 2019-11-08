import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as EXIF from "exif-js";
import { AuthService } from 'src/app/services/auth.service';
import { BasicRestService } from 'src/app/services/basic-rest.service';
import { UserService } from 'src/app/services/user.service';
import { ApiEndpoints } from 'src/app/classes/enum/api-endpoints.enum';
import { Helper } from 'src/app/helper/helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StorageItems } from 'src/app/classes/enum/storage-items.enum';
import { LanguageService } from 'src/app/services/language-service.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  public fileName :string = '';
  public imageUploading : boolean = false;
  public sending : boolean = false;
  @Input() imageArray : any[] = [];

  @Output() geoLocation = new EventEmitter();
  @Output() imageObject = new EventEmitter();
  constructor(
    private authService : AuthService,
    private baseService : BasicRestService,
    private userService : UserService,
    private storage : LocalStorageService,
    public language : LanguageService
  ) { }


  ngOnInit() {
  }

  setFilename(value) {
    console.log(value.target.files);

    Array.from(value.target.files).forEach((file : any) => {
      console.log(file.name)
      if (value.target.files.length > 1) {
        this.fileName = this.fileName  + file.name + ', ';
      } else {
        this.fileName = this.fileName  + file.name;
      }
    });

    this.uploadImage(value);
  }

  uploadImage(event) {
    console.log('upload image')
    if (event !== undefined) {
      const firstFile = event.target.files[0];
      let _this = this;
      EXIF.getData(firstFile, function() {
          if (
              EXIF.getTag(firstFile, "GPSLatitude") &&
              EXIF.getTag(firstFile, "GPSLongitude")
          ) {
              let latitude = Helper.toDecimal(EXIF.getTag(firstFile, "GPSLatitude"));
              let longitude = Helper.toDecimal(EXIF.getTag(firstFile, "GPSLongitude"));
              this.geoLocation.emit({'lat': latitude,'lng':longitude})
          }
      });
      for (let index = 0; index < event.target.files.length; index++) {
          const file = event.target.files[index];
          this.imageUploading = true;
          this.upload(file);
      }

      this.sending = false;
    }
  }

  upload(file) {
    this.sending = true;
    var mediaForm = this.buildMediaData(file);

    this.baseService.postMedia(ApiEndpoints.media, mediaForm).subscribe(response => {
      this.updateImageArray(response)
    })

  }

  buildMediaData(fileInput) {
    var formData = new FormData();
    formData.append("action", "upload-attachment");
    formData.append("file", fileInput);
    formData.append("name", fileInput.name);

    formData.append("_wpnonce", this.storage.getItem(StorageItems.wpNonce));

    return formData;
  }

  updateImageArray(api_response) {
    let tmp_obj = Helper.buildImageObject(api_response);
    this.imageArray.push(tmp_obj);
    this.fileName = '';
    console.log(this.imageArray)
    this.imageUploading = false;
    this.imageObject.emit(this.imageArray)
  }



  deleteImage(imageID) {
      this.baseService.deleteMedia(ApiEndpoints.media+imageID+'?force=true').subscribe(res => {
        this.deleteImageFromArray(imageID);
      });
  }

  deleteImageFromArray(imageID) {
    for (var i = 0; i < this.imageArray.length; i++) {
        if (this.imageArray[i].id == imageID) {
            this.imageArray.splice(i, 1);
            break;
        }
    }
  }
}
