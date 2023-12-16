import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigProfileComponent } from './components/config-profile/config-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardGuard } from '../../core/guards/dashboard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from '../../core/guards/profile.guard';

const routes: Routes = [
  {
    path:'configure',
    component: ConfigProfileComponent,

  },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard],
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
