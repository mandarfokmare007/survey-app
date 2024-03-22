import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./component/loader/loader.component";
import { HeaderComponent } from './component/header/header.component';
import { CardsComponent } from './component/dashboard/cards/cards.component';
import { DashboardTableComponent } from './component/dashboard/dashboard-table/dashboard-table.component';
import { DashboardComponent } from "./component/dashboard/dashboard/dashboard.component";
import { SurveyResponseComponent } from './component/dashboard/survey-response/survey-response.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule } from 'primeng/progressbar'; 
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ReportsComponent } from './component/dashboard/reports/reports.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoaderComponent, HeaderComponent, CardsComponent, DashboardTableComponent, DashboardComponent ,SurveyResponseComponent , CommonModule,
      // BrowserAnimationsModule, 
      ButtonModule ,
      ProgressBarModule,
      DialogModule ,
      CheckboxModule,
      ReportsComponent,

      
    ]
})
export class AppComponent {
  title = 'survey-app';
}
