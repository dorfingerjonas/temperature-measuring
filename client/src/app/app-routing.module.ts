import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentTempComponent } from './components/current-temp/current-temp.component';

const routes: Routes = [
  {path: '', component: CurrentTempComponent},
  {path: '**', component: CurrentTempComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
