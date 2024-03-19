import { Component } from '@angular/core';
import { DashboardTableComponent } from "../dashboard-table/dashboard-table.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cards',
    standalone: true,
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.scss',
    imports: [DashboardTableComponent,CommonModule]
})
export class CardsComponent {

}
