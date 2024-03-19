import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DashboardService } from '../../../services/dashboard.service';
import { CompletedResponse, EscalatedResponse, PendingResponse } from '../../../models/dashboardResponse';
import { Capitalize } from '../../../helpers/pipes/capitalize.pipe';
import {   NO_DATA_CHART,
  PAGE_HEADINGS,
  PATIENT_SKIPPED_MSG,
  PBD_CHART_COLORS,
  TABLE_COL_NAMES,
  TOTAL_PATIENT_CHART_COLORS,
  BELOWTARGETPOPUPTABLECOLUMNS,
  ESCALATEDCOLS,
  PENDINGCOLS,
  SIGNOFFCOLS,
  COMPLETEDCOLS,
  UNREGISTEREDPOPUPTABLECOLUMNS,
  TODAYSACTIVITIYPOPUPTABLECOLUMNS, } from 'src/app/shared/constants/dashboard.constant';
import { ROLE_PROVIDERS } from 'src/app/shared/constants/config';
import { SURVEY_RESPONSE_URL } from 'src/app/shared/constants/route-url';
import { MenuItem } from 'primeng/api';
import { LoaderService } from 'src/app/services/loader.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [TabViewModule,TableModule,CommonModule,Capitalize,ButtonModule],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardTableComponent implements OnInit{
  isRoleAssistant: boolean | undefined;
  ngOnInit() {
    // this.dashboardService.flag.subscribe((value) => {
    //   this.flag = value;
    // });
    this.escalatedCols = ESCALATEDCOLS;
    this.pendingCols = PENDINGCOLS;
    this.completedCols = COMPLETEDCOLS;
    this.signOffCols = SIGNOFFCOLS;
    this.getClinicianDashboardData();
    // localStorage.setItem('surveyId', '');
    // this.indexTab = Number(localStorage.getItem('index'));
    this.toggleItems = [
      {
        label: 'View',
        icon: 'pi pi-eye',
        routerLink: SURVEY_RESPONSE_URL,
      },
    ];
    // this.isRoleAssistant =
    //   this.currentUserHeaderInfo?.userRole == ROLE_PROVIDERS ? false : true;
  }
  currentTimestamp!: number;
  indexTab!: number;
  // public totalPatientsChartLabels: Label[] = [''];
  // public totalPatientsChartType: ChartType = 'bar';
  public totalPatientsChartLegend = true;
  public totalPatientsChartPlugins = [];
  public isRoleQhp = true;
  // public totalPatientsChartColors = TOTAL_PATIENT_CHART_COLORS;
  // public totalPatientsChartData: ChartDataSets[] = [
  //   { data: [], label: 'Assigned' },
  //   { data: [], label: 'Pending' },
  // ];
  // Patient ConditionChart
  // PolarArea
  // public patientStatusChartLabels: Label[] = [];
  public patientStatusLegend = true;
  public patientStatusChartColors = [
    {
      // all colors in order
      backgroundColor: [],
    },
  ];
  // public patientStatusChartType: ChartType = 'polarArea';
  // Patients by Division Chart
  // public patientsbyDivisionChartLabels: Label[] = [];
  public patientsbyDivisionChartColors = [
    {
      // all colors in order
      // backgroundColor: PBD_CHART_COLORS,
    },
  ];
  // public patientsbyDivisionChartData: MultiDataSet = [[20, 20, 30, 10, 20]];
  // public doughnutChartType: ChartType = 'doughnut';
  todayDate = new Date();
  currentUser: any = {"exp":1719382678,"iat":1710742678,"jti":"d19b9af8-81ca-4f90-a313-3e2a041b8840","iss":"http://20.127.78.40:8080/auth/realms/PainScriptApp","aud":"account","sub":"f:9a644c1f-e0b3-4ef3-ad87-f0a3d8fbfe8a:618","typ":"Bearer","azp":"painscript-physician-app","session_state":"edfdcafa-78b3-4a98-b58b-5da2d9511c9d","acr":"1","realm_access":{"roles":["Clinicians","offline_access","uma_authorization"]},"resource_access":{"account":{"roles":["manage-account","manage-account-links","view-profile"]}},"scope":"openid profile email","sid":"edfdcafa-78b3-4a98-b58b-5da2d9511c9d","email_verified":false,"name":"Argires clinician","preferred_username":"argiresclin@test.com","given_name":"Argires","family_name":"clinician"}
  currentUserHeaderInfo: any = {"clientName":"Argires Marotti Neurosurgical Associates of Lancaster","siteName":"Demo","token_type":"Bearer","deviceId":null,"qhpUser":true,"client_id":"painscript-physician-app","unitType":"I","isClientBlocked":false,"not-before-policy":0,"scope":"openid profile email","state":null,"session_state":"edfdcafa-78b3-4a98-b58b-5da2d9511c9d","lastLoggedInTime":"2024-03-15T10:00:23.000+00:00","expires_in":8639999,"deviceType":null,"clientId":35,"productId":3,"userName":"argiresclin@test.com","userId":618,"deviceToken":null,"firstName":"Argires","refresh_expires_in":12959999,"clientCategory":"P","siteId":48,"userRole":"Clinicians","status":"Active"}
  siteName: any = this.currentUserHeaderInfo.siteName;
  clinicianName: any = this.currentUser.name;
  // pageHeadings = PAGE_HEADINGS;
  // noChartData = NO_DATA_CHART;
  // tableColumns = TABLE_COL_NAMES;
  siteId = this.currentUserHeaderInfo?.siteId;
  toggleItems: MenuItem[] = [];
  dashboardTileDataPopup: boolean = false;
  selectedPopupTitle: string = '';
  // cardTableData: cardDataItem[] = [];
  isDisabled: boolean = false;
  emptyTodayActivity: any = {
    patientsInRed: 0,
    reviewedSurveys: 0,
    surveyRequests: 0,
    syncedAt: '2021-09-29 00:00:00 UTC',
    unansweredSurveys: 0,
  };
  emptyCurrentStatus: any = {
    escalatedSurvey: 0,
    offtrackPatient: 0,
    readyForCycleReview: 0,
    unregisteredPatients: 0,
  };
  escalatedCols: any[] = [];
  pendingCols: any[] = [];
  completedCols: any[] = [];
  signOffCols: any[] = [];
  // popupTableUnregisteredCols: any[] = UNREGISTEREDPOPUPTABLECOLUMNS;
  // popupTableBelowTargetCols: any[] = BELOWTARGETPOPUPTABLECOLUMNS;
  // popupTableTodaysActivityCols: any[] = TODAYSACTIVITIYPOPUPTABLECOLUMNS;
  popupTableCols: any[] = [];
  escalatedTableCols: any[] = [];
  showThreeCols: boolean = false;
  days?: number;
  // belowTargetPrintData!: BelowTargetResponseData[];
  // escalatedSurveysPrintData!: DashboardResponseData[];
  // readyForCycleReviewPrintData!: DashboardResponseData[];
  // unregisteredPatientsPrintData!: UnregisteredPatientsResponseData[];
  // unansweredSurveysPrintData!: DashboardResponseData[];
  // dashboardPrintData: printMatricsDashboardData[] = [];
  printData: boolean = false;
  data: any | null;
  exportFlag = false;
  url!: string;
  surveyReviewPopup: boolean | undefined = false;
  surveyId!: number | undefined;
  flag: boolean = false;
  hideTableRow!: boolean | undefined;
  // physicianDashboardData!: DashboardResponse;
  // clinicianDashboardData!: DashboardResponse;
  pendingPatientSurvey: PendingResponse[] = [];
  escalatedPatientSurvey: EscalatedResponse[] = [];
  completedPatientSurvey: CompletedResponse[] = [
    {
        "name": "Test, Alice",
        "cycle": "Day 6 / Cycle 8",
        "status": "grey",
        "survey": "Daily Check-In",
        "closedBy": "System",
        "patientid": 744,
        "completedDate": "03/17/2024",
        "escalatedStatus": "false",
        "surveyResponseId": 212445
    },
    {
        "name": "Ram, Mahidar",
        "cycle": "Day 14 / Cycle 16",
        "status": "grey",
        "survey": "Pain Disability Index",
        "closedBy": "System",
        "patientid": 624,
        "completedDate": "03/17/2024",
        "escalatedStatus": "false",
        "surveyResponseId": 212417
    },
    {
        "name": "name, patient",
        "cycle": "Day 14 / Cycle 15",
        "status": "grey",
        "survey": "Daily Check-In",
        "closedBy": "System",
        "patientid": 622,
        "completedDate": "03/17/2024",
        "escalatedStatus": "false",
        "surveyResponseId": 212391
    },
    {
        "name": "Dutta, Subir",
        "cycle": "Day 1 / Cycle 11",
        "status": "grey",
        "survey": "Daily Check-In",
        "closedBy": "System",
        "patientid": 776,
        "completedDate": "03/17/2024",
        "escalatedStatus": "false",
        "surveyResponseId": 212367
    },
    {
        "name": "Ios, Patient",
        "cycle": "Day 13 / Cycle 16",
        "status": "grey",
        "survey": "FABQ",
        "closedBy": "System",
        "patientid": 621,
        "completedDate": "03/17/2024",
        "escalatedStatus": "false",
        "surveyResponseId": 212344
    }
]
  signOffPatientSurvey: PendingResponse[] = [];
  // todaysActivity?: DashboardTodaysActivity;
  // currentStatus?: DashboardCurrentStatus;
  synced_at!: any;
  surneyNameColumn: any = { field: 'surveyName', header: 'Survey Name' };
  // pbdChartData: TopPatientDiagnosisResponse[] = [];
  pbdItemLabels: string[] = [];
  ispbdChartData: boolean = false;
  ispbsChartData: boolean = false;
  // tpChartData: PatientSurveyAssignmentsResponse[] = [];
  istpChartData: boolean = false;
  isNoEscalations!: boolean;
  showEscalatedAlert: boolean = false;
  activeIndex: number = 0;
  escalatedSurveysCount: number = 0;
  syncedTime?: string;
  pendingPatientFilteredArray: any[] = [];
  pendingLength!: number;
  patientId: any;
  signoffLength!: number;
  unregisteredPatientFlag: boolean = false;
  escalatedLength!: number;
  dashboardSetInterval: any;
  currentDate: string = '';
  private dashboardService!: DashboardService;
  // cardFilteredData: cardDataItem[] = [];
  constructor(
    // private router: Router,
    // private authenticationService: AuthenticationService,
    // private dashboardService: DashboardService,
    // private sharedDataService: SharedDataService,
    // private messageService: MessageService,
    public loaderService: LoaderService,
    // private myElement: ElementRef
  ){
    
  }
    /**
   * Clears the cache of the dashboard
   */
    clearDashboardCache() {
      this.loaderService.show();
      this.dashboardService.hitCacheRefreshUrl(this.siteId).subscribe(
        (res: any) => {
          window.location.reload();
        },
        (err: any) => {
          this.loaderService.hide();
        }
      );
    }
  getClinicianDashboardData() {
    // this.loaderService.show();
    // this.dashboardService.getClinicianDashboardData(this.clinicianId).subscribe(
    //   (res: any) => {
    //     this.loaderService.hide();
    //     this.clinicianDashboardData = res;

    //     if (this.clinicianDashboardData.todays_activity != null) {
    //       this.todaysActivity = this.clinicianDashboardData.todays_activity;
    //       this.synced_at = new Date(this.todaysActivity?.syncedAt);
    //     } else {
    //       this.todaysActivity = this.emptyTodayActivity;
    //     }

    //     if (this.clinicianDashboardData.current_status != null) {
    //       this.currentStatus = this.clinicianDashboardData.current_status;
    //     } else {
    //       this.currentStatus = this.emptyCurrentStatus;
    //     }

    //     if (
    //       this.synced_at == '' ||
    //       this.synced_at == null ||
    //       this.synced_at == undefined
    //     ) {
    //       const timeStr = String(this.todayDate).split(' ')[4];
    //       this.syncedTime = timeStr;
    //     } else {
    //       this.syncedTime = this.synced_at.toString().split(' ')[4];
    //     }

    //     if (this.clinicianDashboardData.escalated_surveys != null) {
    //       this.escalatedPatientSurvey =
    //         this.clinicianDashboardData.escalated_surveys;
          this.indexTab = 3;
    //     }

    //     this.escalatedLength = this.escalatedPatientSurvey?.length;
    //     if (this.clinicianDashboardData.pending_surveys != null) {
    //       this.pendingPatientSurvey =
    //         this.clinicianDashboardData.pending_surveys;
    //       this.pendingPatientFilteredArray = this.pendingPatientSurvey?.filter(
    //         (o: any) => {
    //           if (o.status != 'RED') {
    //             return o;
    //           }
    //         }
    //       );
    //     }
    //     this.pendingLength = this.pendingPatientFilteredArray?.length;
    //     if (this.clinicianDashboardData.completed_surveys != null) {
    //       this.completedPatientSurvey =
    //         this.clinicianDashboardData.completed_surveys;
    //     }
    //     if (this.clinicianDashboardData.signOff_surveys != null) {
    //       this.signOffPatientSurvey =
    //         this.clinicianDashboardData.signOff_surveys;
    //     }
    //     this.signoffLength = this.signOffPatientSurvey?.length;
    //     if (this.clinicianDashboardData.current_timestamp != null) {
    //       this.currentTimestamp = this.clinicianDashboardData.current_timestamp;
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.loaderService.hide();
    //   }
    // );
  }
  passSurveyToReview(surveyId: number) {
    this.surveyId = surveyId;
    this.surveyReviewPopup = true;
    localStorage.setItem('surveyReviewPopup', String(true));
    this.dashboardService.surveyReviewIdUpdate(surveyId);
    this.dashboardService.flagSubject.next(true);
    localStorage.setItem('hideTableRow', '');
  }

  isUpperCase(status: string) {
    return status == status.toUpperCase();
  }


  formatMilliSecstoDays(milliseconds: number) {
    let millisecondsCalculated = this.currentTimestamp - milliseconds;
    let days: any = 0;

    //Get hours from millisecondsCalculated
    let hours = millisecondsCalculated / (1000 * 60 * 60);
    let absoluteHours = Math.floor(hours);
    let h: any = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    if (h >= 24) {
      days = Math.floor(h / 24);

      h = h % 24;
      days = days > 9 ? days : '0' + days;
      h = h > 9 ? h : '0' + h;
      return days + ' day(s), ' + h + ' hrs';
    }

    if (h > 0) {
      return h + ' hrs, ' + m + ' mins';
    } else {
      return m + ' mins, ' + s + ' secs';
    }
  };

  selectedTab(event: any) {
    localStorage.setItem('index', String(event.index));
  }
}

