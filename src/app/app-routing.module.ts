import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [
  {path:"verify", component:VerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
