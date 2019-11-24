import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponseBase,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of as _observableOf, throwError } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError } from 'rxjs/operators';
import { UserVm, LoginResponseVm, LoginVm } from './user.model';
import { ApiException } from './api-exception.model';
import { SwaggerException } from './swagger.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/auth';
  }

  private handleError(error) {
    return throwError(error);
  }

  register(registerVm): Observable<any> {
    console.log('Register is called');
    console.log(registerVm);
    let url_ = this.baseUrl + '/register';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .post(url_, registerVm, options_)
      .pipe(catchError(this.handleError));
  }

  login(loginVm): Observable<any> {
    let url = this.baseUrl + '/login';
    url = url.replace(/[?&]$/, '');

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .post(url, loginVm, options)
      .pipe(catchError(this.handleError));
  }
}
