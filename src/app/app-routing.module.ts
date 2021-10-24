import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordraceComponent } from 'src/components/wordrace/wordrace.components';

const routes: Routes = [
  {
    component: WordraceComponent,
    path: "wordrace"
  },
  {
    component: WordraceComponent,
    path: ""
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
