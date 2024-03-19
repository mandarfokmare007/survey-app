// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  "auth_apiUrl": "http://painscript-uat-api-management.azure-api.net/ms1-dev",
  "api_key": "402692fc0614418b80fbe1606ebebe12",
  "user_apiUrl": "http://painscript-uat-api-management.azure-api.net/ms2-dev/user-management",
  "util_apiUrl": "http://painscript-uat-api-management.azure-api.net/ms3-dev/util",
  "survey_apiUrl": "http://painscript-uat-api-management.azure-api.net/ms4-dev/manage-survey",
  "monitor_apiUrl": "http://painscript-uat-api-management.azure-api.net/ms4-dev/monitor-plan",
  timeOut: 115000,
  survey_review_idle_time: 60,
  survey_review_timeout_time: 30,
  survey_background_draft_interval: 10000,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
