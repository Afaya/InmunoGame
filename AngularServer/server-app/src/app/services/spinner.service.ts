import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) {}

  startOnLoading(): void {
    this.spinner.show();
  }

  finishOnLoading(): void {
    this.spinner.hide();
  }
}
