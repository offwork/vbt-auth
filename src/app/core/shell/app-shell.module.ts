import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleLayoutComponent } from './components/simple-layout/simple-layout.component';



@NgModule({
  declarations: [ SimpleLayoutComponent ],
  imports: [ RouterModule ],
  exports: [ SimpleLayoutComponent ]
})
export class AppShellModule { }
