import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(
    private _spinner: NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._spinner.show();
    return next.handle(request).pipe(
      finalize(() => setTimeout(() => {
        this._spinner.hide()
      }, 1000))
    );
  }
}
