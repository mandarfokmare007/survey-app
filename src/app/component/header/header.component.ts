import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
// import { GlobalSearchService } from 'src/app/services/global-search.service';
// import { ProfileImageService } from 'src/app/services/profile-image.service';
// import { SharedDataService } from 'src/app/services/shared-data.service';

export interface globalSearchResult {
  dob: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  phone: string;
  state: string;
  status: string;
  username: string;
}

@Component({
  selector: 'app-header',
  standalone:true,
  templateUrl: './header.component.html',
  imports: [CommonModule],
  styleUrls: ['./header.component.scss'],
  // providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  // topMenuItems: MenuItem[] = [];
  globalSearchInputValue = '';
  globalSearchResults: globalSearchResult[] = [];
  isGlobalSearchResults: boolean = false;
  currentUser: any =
  //  JSON.parse(localStorage.getItem('currentUser')!);
  {"exp":1719136822,"iat":1710496822,"jti":"5f9815f9-573c-441b-b10d-bb15401a8c13","iss":"http://20.127.78.40:8080/auth/realms/PainScriptApp","aud":"account","sub":"f:9a644c1f-e0b3-4ef3-ad87-f0a3d8fbfe8a:618","typ":"Bearer","azp":"painscript-physician-app","session_state":"f44a8997-deae-456b-8add-cd93923c0122","acr":"1","realm_access":{"roles":["Clinicians","offline_access","uma_authorization"]},"resource_access":{"account":{"roles":["manage-account","manage-account-links","view-profile"]}},"scope":"openid profile email","sid":"f44a8997-deae-456b-8add-cd93923c0122","email_verified":false,"name":"Argires clinician","preferred_username":"argiresclin@test.com","given_name":"User","family_name":"clinician"}
  // currentUserHeaderInfo: any = JSON.parse(
    // localStorage.getItem('headerObject')!
  // );
  // headerLogo:any='assets/painscript-logo.svg';
  // healthscriptLogo:any='assets/healthscript-logo.png';
  showLogo: any;

  public siteId = ""
  // this.currentUserHeaderInfo?.siteId;
  public productId = ""
  // this.currentUserHeaderInfo?.productId;
  public proImg: string = '';
  clinicianId!: number;
  private subscription!: Subscription;
  /**
   * Constructor
   * @param router
   * @param fb
   * @param authenticationService
   * @param profileImgService
   * @param globalSearchService
   * @param sharedService
   * @param messageService
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private authenticationService: AuthenticationService,
    // private globalSearchService: GlobalSearchService,
    // private sharedService: SharedDataService,
    // private messageService: MessageService,
    // private profileImgService: ProfileImageService
  ) {}

  /**
   * On component load
   */
  ngOnInit() {

    //  if(this.currentUserHeaderInfo?.logo){
    //   this.showLogo=this.currentUserHeaderInfo?.logo;
    // }
    // else{
    //   if(this.productId === 2 && this.productId != null){
    //       // this.showLogo = this.healthscriptLogo;
    //   }
    //   if(this.productId != 2 && this.productId != null)
    //   {
    //       // this.showLogo = this.headerLogo;
    //   }

    // }


    // this.clinicianId = this.currentUserHeaderInfo?.userId;
    // this.getProfileImg(this.clinicianId);
    // this.topMenuItems = [
    //   {
    //     label: 'Change Password',
    //     icon: 'pi pi-key',
    //     command: () => {
    //       this.changePassword();
    //     },
    //   },

    //   {
    //     label: 'Logout',
    //     icon: 'pi pi-sign-out',
    //     command: () => {
    //       this.logout();
    //     },
    //   },
    // ];
  }

  /**
   * Form Builder
   */
  globalSearchForm = this.fb.group({
    globalSearch: ['', Validators.minLength(3)],
  });

  /**
   * Global Search
   */
  // globalSearch() {
  //   this.globalSearchInputValue = this.globalSearchForm.value.globalSearch;
  //   if (this.globalSearchInputValue == '') {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Search Input should not be empty',
  //     });
  //   } else if (this.globalSearchInputValue.length < 3) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Kindly enter at least 3 letters to Search.',
  //     });
  //   } else {
  //     this.siteId = this.currentUserHeaderInfo?.siteId;
  //     if (this.globalSearchForm.valid) {
  //       this.globalSearchService
  //         .getPatientsList(this.globalSearchInputValue, this.siteId)
  //         .subscribe(
  //           (res: any) => {
  //             this.globalSearchResults = res;
  //             if (
  //               this.globalSearchResults == null ||
  //               this.globalSearchResults.length == 0
  //             ) {
  //               this.messageService.add({
  //                 severity: 'error',
  //                 summary: 'Error',
  //                 detail: 'No Results Found.',
  //               });
  //             } else if (this.globalSearchResults.length != 0) {
  //               this.sharedService.updateGlobalSearchResults(
  //                 this.globalSearchResults
  //               );
  //               this.router.navigate([`/manage-patient`]);
  //             }
  //           },
  //           (err: any) => {
  //             console.log(err);
  //             if ((err.status = 500)) {
  //               this.messageService.add({
  //                 severity: 'error',
  //                 summary: 'Error',
  //                 detail: 'No Results Found.',
  //               });
  //             } else {
  //               this.messageService.add({
  //                 severity: 'error',
  //                 summary: 'Error',
  //                 detail: err.message,
  //               });
  //             }
  //           }
  //         );
  //     }
  //   }
  // }

  /**
   * Profile Image
   * @param clinicianId
   */
  // getProfileImg(clinicianId: number) {
  //   this.profileImgService.getProfileImage(clinicianId).subscribe(
  //     (res: any) => {
  //       this.proImg = res.photoThumbnail;
  //     },
  //     (err: Error) => {
  //       console.log(err);
  //     }
  //   );
  // }
  /**
   * Change Password
   */
  changePassword() {
    this.router.navigateByUrl('/change-password');
  }

  /**
   * Logout
   */
  // logout() {
  //   this.authenticationService.logout();
  //   this.router.navigate(['/']);
  // }
}
