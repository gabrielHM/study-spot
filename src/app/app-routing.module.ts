import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { StudyCenterOverviewComponent } from './modules/study-center-overview/study-center-overview.component';
import { AdminHomeComponent } from './modules/admin-home/admin-home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'studycenter', component: StudyCenterOverviewComponent },
  { path: 'admin', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
