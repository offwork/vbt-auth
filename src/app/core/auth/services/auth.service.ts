import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defer, Observable, ReplaySubject } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';
import { Company, LoginFormSchema, Response } from '../models/login-form-schema';

const END_POINT = 'http://10.211.55.3:1925/api/Company';

export interface Pending<T> {
  data: Observable<T>;
  status: Observable<Status>;
}

export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Injectable()
export class AuthService {
  readonly loginStatus = new ReplaySubject<Status>();

  constructor(private _httpClient: HttpClient) {}

  login(loginSchema: LoginFormSchema): Pending<Response<Company>> {
    const status = this.loginStatus;
    const credentials: LoginFormSchema = {
      companyCode: loginSchema.companyCode,
      userName: loginSchema.userName,
      password: this.__encrypt(loginSchema.password),
    };

    const request = this._httpClient.post<Response<Company>>(END_POINT, credentials).pipe(
      delay(100),
      retry(1),
      catchError((errot) => {
        this.loginStatus.next(Status.ERROR);
        throw 'Error loadin Company';
      }),
      tap(() => this.loginStatus.next(Status.SUCCESS))
    );

    const data = defer(() => {
      this.loginStatus.next(Status.LOADING);
      return request;
    });

    return { data, status };
  }

  __encrypt(password: string): string {
    const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    password = password.split('+').join('|');
    const input = encodeURI(password);
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);
    return output;
  }
}
