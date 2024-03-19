import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../models/loader';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  /**
   * Constructor
   */
  constructor() { }

  /**
   * Shows the loader
   */
  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  
  /**
   * Hides the loader
   */
  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}