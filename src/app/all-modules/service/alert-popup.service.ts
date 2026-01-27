import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertPopupService {
  constructor() {}

  successAlert(titleStr: String, textStr: String) {
    Swal.fire({
      title: titleStr + '',
      text: textStr + '',
      // width: '350',
      // imageUrl: 'https://cdn-icons-png.flaticon.com/512/2954/2954893.png',
      // imageWidth: 80,
      // imageHeight: 80,
      icon: 'success',
      background: '#e9e9e6',
      confirmButtonColor: '#133837',
    });
  }

  errorAlert(titleStr: String, textStr: String) {
    Swal.fire({
      title: titleStr + '',
      text: textStr + '',
      // width: '350',
      // imageUrl: 'https://cdn-icons-png.flaticon.com/512/675/675564.png',
      // imageWidth: 80,
      // imageHeight: 80,
      icon: 'error',
      background: '#e9e9e6',
      confirmButtonColor: '#133837',
    });
  }

  warningAlert(titleStr: String, textStr: String) {
    Swal.fire({
      title: titleStr + '',
      text: textStr + '',
      // width: '350',
      // imageUrl: 'https://cdn-icons-png.flaticon.com/512/6009/6009660.png',
      // imageWidth: 80,
      // imageHeight: 80,
      icon: 'warning',
      background: '#e9e9e6',
      confirmButtonColor: '#133837',
    });
  }


  successHTMLAlert(titleStr: String, textStr: String) {
    Swal.fire({
      title: titleStr + '',
      html: textStr + '',
      icon: 'success',
      background: '#e9e9e6',
      confirmButtonColor: '#133837',
    });
  }

  
}
