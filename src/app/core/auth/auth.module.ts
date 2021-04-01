import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
  imports: [HttpClientModule, ReactiveFormsModule, RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthModule {}
