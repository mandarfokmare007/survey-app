import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./component/loader/loader.component";
import { HeaderComponent } from './component/header/header.component';
import { CardsComponent } from './component/dashboard/cards/cards.component';
import { DashboardTableComponent } from './component/dashboard/dashboard-table/dashboard-table.component';
import { DashboardComponent } from "./component/dashboard/dashboard/dashboard.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoaderComponent, HeaderComponent, CardsComponent, DashboardTableComponent, DashboardComponent]
})
export class AppComponent {
  title = 'survey-app';
}
