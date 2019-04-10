import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './core/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { StudyCenterOverviewComponent } from './modules/study-center-overview/study-center-overview.component';
import { AdminHomeComponent } from './modules/admin-home/admin-home.component';
import { NewScDialogComponent } from './modules/new-sc-dialog/new-sc-dialog.component';
import { LocationDialogComponent } from './modules/location-dialog/location-dialog.component';
import { NewReviewDialogComponent } from './modules/new-review-dialog/new-review-dialog.component';
import { NewMessageDialogComponent } from './modules/new-message-dialog/new-message-dialog.component';
import { SpeedTestDialogComponent } from './modules/speed-test-dialog/speed-test-dialog.component';
import { UsageDialogComponent } from './modules/usage-dialog/usage-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudyCenterOverviewComponent,
    AdminHomeComponent,
    NewScDialogComponent,
    LocationDialogComponent,
    NewReviewDialogComponent,
    NewMessageDialogComponent,
    SpeedTestDialogComponent,
    UsageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewScDialogComponent, LocationDialogComponent, NewReviewDialogComponent, NewMessageDialogComponent, SpeedTestDialogComponent, UsageDialogComponent]
})
export class AppModule { }
