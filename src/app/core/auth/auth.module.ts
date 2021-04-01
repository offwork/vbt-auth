import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in.component';
import { AuthService } from './services/auth.service';

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
  providers: [AuthService],
})
export class AuthModule {}
