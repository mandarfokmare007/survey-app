import { Component } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { DashboardTableComponent } from "../dashboard-table/dashboard-table.component";
import { SurveyResponseComponent } from '../survey-response/survey-response.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CardsComponent, DashboardTableComponent, SurveyResponseComponent]
})
export class DashboardComponent {

}
