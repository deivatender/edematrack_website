import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-createpass',
  templateUrl: './createpass.component.html',
  styleUrls: ['./createpass.component.css'],
})
export class CreatepassComponent {
  constructor(private popupService: AlertPopupService) {}
}
