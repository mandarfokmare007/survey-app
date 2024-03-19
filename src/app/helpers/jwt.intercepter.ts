// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpResponse,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { AuthenticationService } from '../services/authentication.service';
// import { catchError, map } from 'rxjs/operators';
// import { NavigationExtras, Router } from '@angular/router';
// import { AppConfigService } from '../services/app-config.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   /**
//    * Constructor
//    * @param authenticationService
//    * @param router
//    * @param appConfigService
//    */
//   constructor(
//     private authenticationService: AuthenticationService,
//     private router: Router,
//     private appConfigService: AppConfigService
//   ) {}

//   /**
//    * Intercepts incoming or outgoing HTTP requests using the HttpClient
//    * @param request
//    * @param next
//    * @returns
//    */
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // add auth header with jwt if user is logged in and request is to api url

//     const currentUser = this.authenticationService.currentUserValue;
//     const headerObj = JSON.parse(localStorage.getItem('headerObject')!);
//     const isLoggedIn = currentUser && headerObj;
//     // const isApiUrl = request.url.startsWith(environment.user_apiUrl);
//     let setHeaders;
//     if (isLoggedIn) {
//       setHeaders = {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${headerObj.access_token}`,
//         api_key: this.appConfigService.config.api_key,
//         userName: headerObj.userName?.toString(),
//         userId: headerObj.userId?.toString(),
//         clientId: headerObj.client_id?.toString(),
//         email: headerObj.userName?.toString(),
//         siteId: headerObj.siteId?.toString(),
//         productId: headerObj.productId?.toString()
//       };
//     } else {
//       setHeaders = {
//         'content-type': 'application/json',
//         api_key: this.appConfigService.config.api_key,
//       };
//     }
//     request = request.clone({
//       setHeaders: setHeaders,
//     });

//     return next.handle(request).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//         }
//         return event;
//       }),
//       catchError((error: HttpErrorResponse) => {
//         if (error.status == 401 && isLoggedIn) {
//           this.authenticationService.logout();
//           let navigationExtras: NavigationExtras = {
//             queryParams: {
//               error: 'Timeout',
//             },
//           };
//           this.router.navigate(['/clinician-login'], navigationExtras);
//         }
//         return throwError(error);
//       })
//     );
//   }
// }
