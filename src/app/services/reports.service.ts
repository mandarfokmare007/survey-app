import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, timeout } from 'rxjs/operators';
import { DashboardResponse } from '../models/dashboardResponse';
import {
  PatientActivityReportdResponse,
  PatientBillingReportResponse,
  PatientCycleReviewdResponse,
} from '../models/reports';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  /**
   * Constructor
   * @param http
   * @param appConfigService
   */
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /**
   * Patient Activity Reports List service
   * @param siteId
   * @returns Patient Activity Reports List
   */
  getPatientActivityReports(siteId: string) {
    return this.http
      .get<PatientActivityReportdResponse>(
        `${this.appConfigService.config?.user_apiUrl}/patient-activity-report/${siteId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Patient Activity Reports List service
   * @param siteId
   * @returns Patient Activity Reports List
   */
  getPatientCycleReviews(siteId: string) {
    return this.http
      .get<PatientCycleReviewdResponse[]>(
        `${this.appConfigService.config?.user_apiUrl}/patient-cycle-review/${siteId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Patient Billing Reports List service
   * @param siteId
   * @returns Patient Billing Reports List
   */
  getPatientBillingReports(siteId: string, selectedMonth: string) {
    return this.http
      .get<PatientBillingReportResponse[]>(
        `${this.appConfigService.config?.user_apiUrl}/billingExport/${siteId}/${selectedMonth}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }
  
  /**
   * cycle Review List service
   * @param siteId
   * @returns cycle Review Reports List
   */
  exportCycleReviews(siteId: string, selectedMonth: string) {
    return this.http.get(
      `${this.appConfigService.config?.user_apiUrl}/export-cycle-review/${siteId}/${selectedMonth}`,
      { responseType: 'blob' }
    );
  }

  /**
   * Billing Report List service
   * @param siteId
   * @returns Billing Reports List
   */
  exportBillingReports(siteId: string, selectedMonth: string) {
    return this.http.get(
      `${this.appConfigService.config?.user_apiUrl}/billingExport/export/${siteId}/${selectedMonth}`,
      { responseType: 'blob' }
    );
  }

  /**
   * cycle Review Details service
   * @param cycleId
   * @returns cycle Review Details
   */
  getCycleReviewDetails(cycleId: number) {
    // return this.http
    //   .get<cycleReviewDetailsData[]>(
    //     `${this.appConfigService.config?.user_apiUrl}/patient-cycle-detail/${cycleId}`
    //   )
    //   .pipe(
    //     timeout(this.appConfigService.config?.timeOut),
    //     map((res) => {
    //       return res;
    //     })
    //   );
  }

  /**
   * update cycle Review Details service
   * @param cycleId
   * @returns updated cycle Review Details
   */
  updateReviewCycle(cycleId: number, cycleReviewUpdateRequest: any) {
    return this.http
      .put<any>(
        `${this.appConfigService.config?.user_apiUrl}/review-cycle/${cycleId}`,
        cycleReviewUpdateRequest
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }
}
