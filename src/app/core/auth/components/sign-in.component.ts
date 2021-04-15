import { Component, Inject, OnDestroy, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WINDOW } from '../../tokens/window.token';
import { AuthService, Status } from '../services/auth.service';

@Component({
  selector: 'vbt-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'vbt-sign-in' },
})
export class SignInComponent implements OnDestroy {
  signInForm: FormGroup;
  _endSubscription$ = new Subject<boolean>();

  constructor(
    @Inject(WINDOW) public _window: Window,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _domSanitizer: DomSanitizer
  ) {
    this.signInForm = this.fb.group({
      userName: ['bkasmer'],
      password: ['vbt123456'],
      companyCode: ['1000'],
    });
  }

  signIn() {
    combineLatest([this._auth.login(this.signInForm.value).data, this._auth.loginStatus])
      .pipe(takeUntil(this._endSubscription$))
      .subscribe(([data, status]) => {
        if (status === Status.SUCCESS) {
          const url = this.__sanitizeURL(
            `http://${data.entity.url}/auth/login?key=${encodeURIComponent(data.entity.key)}`
          );

          this._window.open(url as string, '_self');
        }
      });
  }

  ngOnDestroy() {
    this._endSubscription$.next(true);
    this._endSubscription$.complete();
  }

  __sanitizeURL(url: string): SafeUrl {
    return this._domSanitizer.sanitize(SecurityContext.URL, this._domSanitizer.bypassSecurityTrustUrl(url)) as SafeUrl;
  }
}
