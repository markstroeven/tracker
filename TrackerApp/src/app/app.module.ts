import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import 'hammerjs';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoalComponent } from './components/goal/goal.component';
import { ActionComponent } from './components/action/action.component';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginService } from './services/login.service';
import { StateService } from './services/state.service';
import { PcsService } from './services/pcs.service';
import { GoalService } from './services/goal.service';

import { RouterModule, Routes } from '@angular/router';
import { GoalWizzardComponent } from './components/goal-wizzard/goal-wizzard.component';
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'goal', component: GoalComponent },
  { path: 'goalnew', component: GoalWizzardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GoalComponent,
    ActionComponent,
    GoalWizzardComponent,
    ActionDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MdNativeDateModule,
    FormsModule
  ],
  providers: [
    LoginService,
    StateService,
    PcsService,
    GoalService
  ],
  entryComponents: [
    ActionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
