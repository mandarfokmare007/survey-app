import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, timeout } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyReviewService {
  /**
   * constructor
   * @param http
   * @param appConfigService
   */
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /**
   * get submitted survey service
   * @param surveyId
   * @returns submitted survey
   */
  getSubmitedSurvey(surveyId: number) {
    return this.http
      .get<any>(
        `${this.appConfigService.config?.manage_survey_url}/survey-response/${surveyId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * survey review time update service
   * @param surveyReviewRequest
   * @param surveyId
   * @returns updation status of survey review time
   */
  updateSurveyReviewTime(surveyReviewRequest: any, surveyId: number) {
    return this.http
      .put<any>(
        `${this.appConfigService.config?.monitor_apiUrl}/review-survey-response/${surveyId}`,
        surveyReviewRequest
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * survey review add note update service
   * @param addNoteRequest
   * @param surveyResponseId
   * @returns sent notes
   */
  sendAddNoteData(addNoteRequest: any, surveyResponseId: number) {
    return this.http
      .put<any>(
        `${this.appConfigService.config?.monitor_apiUrl}/add-survey-notes/${surveyResponseId}`,
        addNoteRequest
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * send survey review data service
   * @param surveyResponseId
   * @returns survey review data
   */
  sendSurveyReviewData(surveyResponseId: any) {
    return this.http
      .get<any>(
        `${this.appConfigService.config?.monitor_apiUrl}/survey-response/${surveyResponseId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * get site users by role service
   * @param siteId
   * @param role
   * @returns site user by role
   */
  getSiteUsersByRole(siteId: any) {
    return this.http
      .get<any>(
        `${this.appConfigService.config?.user_apiUrl}/users-lookup/${siteId}/0`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }
  /**
   * get site users by role service
   * @param siteId
   * @param role
   * @returns site user by role
   */
  getPreDefinedRemarks(lookupType: any) {
    return this.http
      .get<any>(
        `${this.appConfigService.config?.util_apiUrl}/lookup/${lookupType}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * get escalation notes service
   * @param surveyId
   * @returns escalation notes
   */
  getEscalationNotes(surveyId: number) {
    return this.http
      .get<any>(
        `${this.appConfigService.config?.manage_survey_url}/survey-response/escalationNotes/${surveyId}`
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * draft review survey service
   * @param requestObj
   * @returns draft review survey
   */
  draftReviewSurvey(requestObj: any, surveyResponseId: number) {
    return this.http
      .post<any>(
        `${this.appConfigService.config?.monitor_apiUrl}/review-survey-draft/${surveyResponseId}`,
        requestObj
      )
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }

  /**
   * get remarks dropdown data service
   * @returns remarks dropdown data
   */
  getRemarksDropDownData() {
    return this.http
      .get<any>(`${this.appConfigService.config.util_apiUrl}/lookup/remark`)
      .pipe(
        timeout(this.appConfigService.config?.timeOut),
        map((res) => {
          return res;
        })
      );
  }
}
