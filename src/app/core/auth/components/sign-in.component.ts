import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'vbt-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'vbt-sign-in' },
})
export class SignInComponent implements OnDestroy {
  signInForm: FormGroup = this.fb.group({
    userName: ['bkasmer'],
    password: ['vbt123456'],
    companyCode: ['1000'],
  });

  _endSubscription = new Subject<boolean>();

  constructor(public fb: FormBuilder, private _auth: AuthService) {}

  signIn() {
    this._auth.login(this.signInForm.value).pipe(takeUntil(this._endSubscription)).subscribe(console.log);
  }

  ngOnDestroy() {
    this._endSubscription.next(true);
    this._endSubscription.complete();
  }
}
