import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'vbt-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'vbt-sign-in' }
})
export class SignInComponent {
  END_POINT = 'http://10.211.55.3:1925/api/Company';

  signInForm: FormGroup = this.fb.group({
    userName: ['bkasmer'],
    password: ['vbt123456'],
    companyCode: ['100'],
  });

  constructor(public fb: FormBuilder, private http: HttpClient) {}

  signIn() {
    // console.log(this.signInForm.value);
    this.http.post(this.END_POINT, this.signInForm.value).pipe().subscribe(console.log);
  }
}
