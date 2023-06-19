import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType } from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../user/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertfy: AlertifyService,
    private toastr: CustomToastrService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.httpClientService
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        fileData
      )
      .subscribe(
        (data) => {
          const message: string = 'Dosyalar Yüklendi';
          if (this.options.isAdminPage) {
            this.alertfy.message(message, MessageType.Success);
          } else {
            this.toastr.message(message, '', {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomRight,
            });
          }
        },
        (errorResponse: HttpErrorResponse) => {
          const message: string = 'Dosyalar Yüklenemedi';
          if (this.options.isAdminPage) {
            this.alertfy.message(message, MessageType.Error);
          } else {
            this.toastr.message(message, '', {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight,
            });
          }
        }
      );
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
