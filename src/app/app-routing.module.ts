import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleLayoutComponent } from './core';

const routes: Routes = [
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
