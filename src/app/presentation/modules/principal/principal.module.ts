import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './components/template/template.component';
import { HeaderComponent } from './components/header/header.component';
import { PrincipalRoutingModule } from './principal-routing.module';



@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
