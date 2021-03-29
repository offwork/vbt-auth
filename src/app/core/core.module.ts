import { NgModule } from '@angular/core';
import { AppShellModule } from './shell/app-shell.module';



@NgModule({
  exports: [ AppShellModule ],
  imports: [ AppShellModule ]
})
export class CoreModule { }
