import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ConfigProfileComponent } from './components/config-profile/config-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProgressBarModule } from '../../shared/global/modules/progress-bar/progress-bar.module';
import { LoaderModule } from '../../shared/global/modules/loader/loader.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ConfigProfileComponent,
    DialogComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ScrollingModule,
    ProgressBarModule,
    LoaderModule

  ]
})
export class DashboardModule { }
