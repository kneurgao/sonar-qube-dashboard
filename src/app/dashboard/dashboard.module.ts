import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbDropdownModule,
    DashboardRoutingModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
