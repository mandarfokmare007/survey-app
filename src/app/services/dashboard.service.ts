import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, timeout } from 'rxjs/operators';
import {
  DashboardResponse,
  cardDataItem,
  printMatricsDashboardData,
} from '../models/dashboardResponse';
import { AppConfigService } from './app-config.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public surveyIdSubject: BehaviorSubject<any>;
  public surveyId: Observable<any>;
  public flagSubject: BehaviorSubject<boolean>;
  public flag: Observable<any>;
  /**
   * Constructor
   * @param http
   * @param appConfigService
   */
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {
    this.surveyIdSubject = new BehaviorSubject<any>(null);
    this.surveyId = this.surveyIdSubject.asObservable();
    this.flagSubject = new BehaviorSubject<boolean>(false);
    this.flag = this.flagSubject.asObservable();
  }

  /**
   * gets the survey Id value
   */
  public get surveyIdValue(): any {
    return this.surveyIdSubject.value;
  }

  /**
   * gets the flag value set for updated surveyId
   */
  public get isFlagValue(): any {
    return this.flagSubject.value;
  }

  /**
   * updates the surveyId value
   * @param surveyId
   */
  surveyReviewIdUpdate(surveyId: number) {
    this.surveyIdSubject.next(surveyId);
  }

  /**
   * sets the value of surveyId to null
   */
  surveyReviewIdNull() {
    this.surveyIdSubject.next(null);
  }

  /**
   * clinician dashboard data service
   * @param clinicianId
   * @returns Clinician Dashboard Data
   */
  getClinicianDashboardData(clinicianId: number) {
    return this.http
      .get<DashboardResponse>(
        `${this.appConfigService.config?.user_apiUrl}/clinician-dashboard/${clinicianId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }
  /**
   * clinician dashboard data service
   * @param siteId
   * @returns Clinician Dashboard Data
   */
  getCardData(siteId: number, cardName: string) {
    console.log('Cardname', cardName);
    return this.http
      .get<cardDataItem[]>(
        `${this.appConfigService.config?.monitor_apiUrl}/matric-info/${siteId}/${cardName}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Retrives the data for printing the dashboard
   * @param siteId
   * @returns Printable Dashboard Data
   */
  getDashboardPrintData(siteId: number) {
    return this.http
      .get<printMatricsDashboardData[]>(
        `${this.appConfigService.config?.monitor_apiUrl}/print-matric-info/${siteId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Sends Reminder message to the patients
   * @param patientId
   * @returns
   */
  sendPatientReminder(patientId: number) {
    return this.http
      .post<any>(
        `${this.appConfigService.config?.user_apiUrl}/below-target-reminder/${patientId}`,
        ''
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }


  /**
   * Sends Reminder message to the patients
   * @param patientId
   * @returns
   */
  sendUnregisteredPatientReminder(patientId: number) {
    return this.http
      .post<any>(
        `${this.appConfigService.config?.user_apiUrl}/below-target-reminder/${patientId}?unregistered=true`,
        ''
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Refreshes the cache of dashboard
   * @param siteId
   * @returns dashboard data
   */
  hitCacheRefreshUrl(siteId: number) {
    return this.http
      .get<any>(
        `${this.appConfigService.config?.util_apiUrl}/clear-cache/${siteId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }
}
