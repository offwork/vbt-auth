import { Component, OnDestroy, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  signInVar: string;

  signInForm: FormGroup;
  _endSubscription = new Subject<boolean>();

  constructor(private fb: FormBuilder, private _auth: AuthService, private _domSanitizer: DomSanitizer) {
    this.signInForm = this.fb.group({
      userName: ['bkasmer'],
      password: ['vbt123456'],
      companyCode: ['1000'],
    });
  }

  signIn() {
    this._auth
      .login(this.signInForm.value)
      .pipe(takeUntil(this._endSubscription))
      .subscribe((response) => {
        const url = this.__sanitizeURL(
          `http://${response.entity.url}/auth/login?key=${encodeURIComponent(response.entity.key)}`
        );
        window.open(url as string, '_blank');
      });
  }

  ngOnDestroy() {
    this._endSubscription.next(true);
    this._endSubscription.complete();
  }

  __sanitizeURL(url: string): SafeUrl {
    return this._domSanitizer.sanitize(SecurityContext.URL, this._domSanitizer.bypassSecurityTrustUrl(url)) as SafeUrl;
  }
}
