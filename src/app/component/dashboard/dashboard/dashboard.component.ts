import { Component } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { DashboardTableComponent } from "../dashboard-table/dashboard-table.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CardsComponent, DashboardTableComponent]
})
export class DashboardComponent {

}
