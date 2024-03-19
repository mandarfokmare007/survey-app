import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { LoaderState } from '../../models/loader';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector:'app-loader',
    standalone:true,
    imports:[CommonModule,ProgressSpinnerModule],
    templateUrl:'./loader.component.html'
    
})
export class LoaderComponent implements OnInit {
    show = false;
  private subscription: Subscription = new Subscription();

  /**
   * Constructor
   * @param loaderService 
   */
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

  /**
   * Cleans the component
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}