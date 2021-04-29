import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentTempComponent } from './components/current-temp/current-temp.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {path: '', component: CurrentTempComponent},
  {path: 'history', component: HistoryComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
