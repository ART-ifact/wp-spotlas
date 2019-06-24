import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as EXIF from "exif-js";
import { AuthService } from 'src/app/services/auth.service';
import { BasicRestService } from 'src/app/services/basic-rest.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  public fileName :string = '';
  public imageUploading : boolean = false;
  public sending : boolean = false;
  public imageArray : any[] = [];

  @Output() geoLocation = new EventEmitter();
  @Output() imageObject = new EventEmitter();
  constructor(private authService : AuthService, private baseService : BasicRestService) { }


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
              let latitude = this.toDecimal(EXIF.getTag(firstFile, "GPSLatitude"));
              let longitude = this.toDecimal(EXIF.getTag(firstFile, "GPSLongitude"));
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

  toDecimal(number) {
      return (
          number[0].numerator +
          number[1].numerator / (60 * number[1].denominator) +
          number[2].numerator / (3600 * number[2].denominator)
      );
  }

  upload(file) {
    this.sending = true;
    var mediaForm = this.buildMediaData(file);

    this.baseService.post('wp/v2/media/', mediaForm).subscribe(response => {
      this.updateImageArray(response)
    })
  }

  buildMediaData(fileInput) {
    var formData = new FormData();
    formData.append("action", "upload-attachment");
    formData.append("file", fileInput);
    formData.append("name", fileInput.name);

    formData.append("_wpnonce", this.authService.nonce);

    return formData;
  }

  updateImageArray(api_response) {
    let tmp_obj = this.buildImageObject(api_response);
    this.imageArray.push(tmp_obj);
    this.fileName = '';
    console.log(this.imageArray)
    this.imageUploading = false;
    this.imageObject.emit(this.imageArray)
  }

  buildImageObject(imageData) {
    var imageID = imageData.id;
    var sourceURL = imageData.source_url;
    var thumbSource;
    if (imageData.media_details.sizes.length > 0) {
        thumbSource = imageData.media_details.sizes.thumbnail.source_url;
    } else {
        thumbSource = sourceURL;
    }
    var tmp_obj = {
        id: imageID,
        large: sourceURL,
        thumb: thumbSource
    };
    return tmp_obj;
  }

  deleteImage(imageID) {
      this.baseService.deleteMedia('wp/v2/media/'+imageID+'?force=true').subscribe(res => {
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
