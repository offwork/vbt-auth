import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in.component';

const authRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];

@NgModule({
  declarations: [SignInComponent],
  imports: [ReactiveFormsModule, RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthModule {}
