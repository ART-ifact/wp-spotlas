import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import exifr from 'exifr'
import { BasicRestService } from 'src/app/services/basic-rest.service';
import { ApiEndpoints } from 'src/app/classes/enum/api-endpoints.enum';
import { Helper } from 'src/app/helper/helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StorageItems } from 'src/app/classes/enum/storage-items.enum';
import { LanguageService } from 'src/app/services/language-service.service';
import { Logger } from 'src/app/helper/logger';
@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  public fileName: string = '';
  public imageUploading : boolean = false;
  public sending : boolean = false;
  @Input() imageArray : any[] = [];

  @Output() geoLocation = new EventEmitter();
  @Output() imageObject = new EventEmitter();
  constructor(
    private baseService : BasicRestService,
    private storage : LocalStorageService,
    public language : LanguageService
  ) { }


  ngOnInit() {
  }

  setFilename(files : FileList ) {
    Array.from(files).forEach((file : any) => {
      if (files.length > 1) {
        this.fileName = this.fileName  + file.name + ', ';
      } else {
        this.fileName = this.fileName  + file.name;
      }
    });

    this.uploadImage(files);
  }

  uploadImage(files : FileList) {
    if (files !== undefined) {
      const firstFile = files[0];
      exifr.gps(firstFile).then(positionData => {
        this.geoLocation.emit({'lat': positionData?.latitude,'lng':positionData?.longitude})
      })
      for (let index = 0; index < files.length; index++) {
          const file = files[index];
          this.imageUploading = true;
          this.upload(file);
      }

      this.sending = false;
    }
  }

  upload(file : File) {
    this.sending = true;
    var mediaForm = this.buildMediaData(file);

    this.baseService.postMedia(ApiEndpoints.media, mediaForm).subscribe(response => {
      this.updateImageArray(response)
    })

  }

  buildMediaData(fileInput : File) {
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
    this.imageObject.emit(this.imageArray)
  }
}
