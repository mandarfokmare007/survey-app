import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: any;

  /**
   * Constructor
   * @param injector 
   */
  constructor(private injector: Injector) {}

  /**
   * Loads App
   * @returns http response
   */
  loadAppConfig() {
    let http = this.injector.get(HttpClient);

    return http
      .get('assets/config/app-config.json')
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }

  /**
   * gets app configuration
   */
  get config() {
    return {
      production: this.appConfig?.production || environment.production,
      auth_apiUrl: this.appConfig?.auth_apiUrl || environment.auth_apiUrl,
      api_key: this.appConfig?.api_key || environment.api_key,
      user_apiUrl: this.appConfig?.user_apiUrl || environment.user_apiUrl,
      util_apiUrl: this.appConfig?.util_apiUrl || environment.util_apiUrl,
      manage_survey_url:
        this.appConfig?.survey_apiUrl || environment.survey_apiUrl,
      timeOut: this.appConfig?.timeOut || environment.timeOut,
      monitor_apiUrl:
        this.appConfig?.monitor_apiUrl || environment.monitor_apiUrl,
      survey_review_idle_time:
        this.appConfig?.survey_review_idle_time ||
        environment.survey_review_idle_time,
      survey_review_timeout_time:
        this.appConfig?.survey_review_timeout_time ||
        environment.survey_review_timeout_time,
      survey_background_draft_interval:
        this.appConfig?.survey_background_draft_interval ||
        environment.survey_background_draft_interval,
    };
    //return this.appConfig;
  }
}
