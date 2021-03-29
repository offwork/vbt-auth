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
  signInForm: FormGroup = this.fb.group({
    companyCode: [''],
    userName: [''],
    password: [''],
  });

  constructor(public fb: FormBuilder) {}
}
