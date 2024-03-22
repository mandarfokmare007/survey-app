import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private reviewSurvey = new BehaviorSubject({});
  currentReviewSurveyObj = this.reviewSurvey.asObservable();

  /**
   * Constructor
   */
  constructor() {}

  /**
   * update survey review object service
   * @param currentReviewSurveyObj
   */
  updateReviewSurveyObj(currentReviewSurveyObj: any) {
    this.reviewSurvey.next(currentReviewSurveyObj);
  }

  private globalSearchResults = new BehaviorSubject([]);
  currentglobalSearchResults = this.globalSearchResults.asObservable();

  /**
   * global search results update service
   * @param currentglobalSearchResults
   */
  updateGlobalSearchResults(currentglobalSearchResults: any) {
    this.globalSearchResults.next(currentglobalSearchResults);
  }

  private globalSearchInput = new BehaviorSubject('');
  currentglobalSearchInput = this.globalSearchInput.asObservable();

  /**
   * global search input update
   * @param currentglobalSearchInput
   */
  updateGlobalSearchInput(currentglobalSearchInput: any) {
    this.globalSearchInput.next(currentglobalSearchInput);
  }

  private cycleReviewDDValue = new BehaviorSubject({
    month: 'Pending',
    monthVal: 'Pending',
  });
  currentcycleReviewDDValue = this.cycleReviewDDValue.asObservable();

  /**
   * global search input update
   * @param currentcycleReviewDDValue
   */
  updatecycleReviewDDValue(currentcycleReviewDDValue: any) {
    this.cycleReviewDDValue.next(currentcycleReviewDDValue);
  }
}
