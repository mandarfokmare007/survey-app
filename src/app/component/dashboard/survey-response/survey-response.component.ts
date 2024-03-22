import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Disorders, PatientDetails, PatientHistory, PhysicianList, Questions, Remarks, SurveyResponse, SurveyReviewResponse, surveyCompletionRequest } from 'src/app/models/surveyResponse';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ROLE_STAFF, TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS, isRTMUser } from 'src/app/shared/constants/config';
import { SurveyResponseConstant } from 'src/app/shared/constants/survey-response.constant';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
// import { Label } from 'ng2-charts';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SurveyReviewService } from 'src/app/services/survey-review.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormGroup } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { chartDetails } from 'src/app/models/response-analysis';



@Component({
  selector: 'app-survey-response',
  standalone: true,
  imports: [
    CommonModule,
    BrowserAnimationsModule, 
    ButtonModule ,
    ProgressBarModule,
    DialogModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule
  ],
  templateUrl: './survey-response.component.html',
  styleUrl: './survey-response.component.scss'
})
export class SurveyResponseComponent 
implements OnInit, AfterViewInit, OnDestroy {
recentNotes: any;
reviewPatientHistory: any;
completeSurvey() {
throw new Error('Method not implemented.');
}
  readonly SurveyResponseConst: typeof SurveyResponseConstant =
    SurveyResponseConstant;

  surveyReviewPopup!: boolean;
  idleState = 'Not started.';
  timedOut = false;
  responseQuestions!: Questions[];
  actualPercentage!: number;
  dayPercentage: number = 14.28;
  dayPercentage1: number = 6.666666666666667;
  preDefinedRemarks: Remarks[] = [];
  surveyId?: number;
  routeParam: Subscription = new Subscription();
  showErrorDialog: boolean = false;
  error: string = '';
  chartsData: Questions[] = [];
  msgsForClinician: Questions[] = [];
  surveyResponseId!: number;
  surveyResponse!: SurveyResponse;
  cycleId!: number;
  counter: number = 0;
  spentTime: number = 0;
  interval!: ReturnType<typeof setTimeout>;
  startTime!: string;
  endTime!: string;
  startTimerFlag: boolean = false;
  endTimerFlag: boolean = false;
  isSpentTime: boolean = false;
  dataServiceSubscription: Subscription = new Subscription();
  dispIconData: any[] = [];
  showEscalatedAlert: boolean = false;
  isAlreadyReviewed: boolean = false;
  remarks: string = '';
  notes?: string;
  displayEscalationDialog: boolean = false;
  displayCompleteSurveyDialog: boolean = false;
  displayAddNotesDialog: boolean = false;
  physiciansList: PhysicianList[] = [];
  escalatedTo?: number;
  reviewRemark?: string = '';
  displayEscalationNotes: boolean = false;
  paused: boolean = false;
  remarksDropdwonData: Remarks[] = [];
  remarksDropdownDataSubscription: Subscription = new Subscription();
  surveyReviewDraftSubscription: Subscription = new Subscription();
  surveyReviewSubscription: Subscription = new Subscription();
  backgroundUpdaterId: number = 0;
  backgroundUpdaterSubscription: Subscription = new Subscription();
  isSurveyEscalated: boolean = false;
  surveyDataReview!: SurveyReviewResponse;
  patientDetails!: PatientDetails;
  patientGender!: string;
  patientDisorders: Disorders[] = [];
  patientComorbidities: Disorders[] = [];
  patientHistory!: PatientHistory;
  // reviewPatientHistory: history[] = [];
  // recentNotes: history[] = [];
  cravingsScoreOptions!: ChartOptions;
  painScoreOptions!: ChartOptions;
  painStatus!: string;
  charts: chartDetails[] = [];
  signOff!: boolean;
  ESCALATED: string = 'Escalated';
  COMPLETED: string = 'Completed';
  SIGNOFF: string = 'SignOff';
  newFilteredAddReviewNoteArray: any[] = [];
  score!: number;
  patientMessage?: string;
  displayTimeOnCheck: boolean = false;
  painDetails!: chartDetails;
  cravingsDetails!: chartDetails;
  surveyType!: string;
  surveyResponseScore!: number;
  selectedAddReviewNotePhysician!: string;
  fullScreen: boolean = false;
  selectedAddReviewNotePhysicianId!: number;
  currentUserHeaderInfo: any = JSON.parse(
    localStorage.getItem('headerObject') || '{}'
  );
  getUnitType: any = this.currentUserHeaderInfo.unitType;
  date: any;
  hideTableRow: boolean = false;
  public siteId = this.currentUserHeaderInfo.siteId;
  public loggedInUserId = this.currentUserHeaderInfo.userId;
  public isRoleQhp = this.currentUserHeaderInfo.qhpUser;
  public isRoleAssistant =
    this.currentUserHeaderInfo?.userRole === ROLE_STAFF ? true : false;
  public roleId = this.currentUserHeaderInfo?.userRole === ROLE_STAFF ? 4 : 3;
  isRTMUser?: boolean = isRTMUser();

  /**
   * Pain Score response chart properties
   */
  // public painScoreLabels: Label[] = [];
  public painScoreType: ChartType = 'line';
  public painScoreLegend = false;
  public painScorePlugins = [pluginAnnotation];

  public painScoreData = [
    {
      data: [],
    },
  ];

  /**
   * Craving Score response chart properties
   */
  // public cravingsScoreLabels: Label[] = [];
  public cravingsScoreType: ChartType = 'line';
  public cravingsScoreLegend = false;
  public cravingsScorePlugins = [pluginAnnotation];

  public cravingsScoreData = [
    {
      data: [],
    },
  ];
  /**
   * Constructor
   * @param router
   * @param sharedDataService
   * @param surveyReviewService
   * @param messageService
   * @param confirmationService
   * @param loaderService
   * @param fb
   * @param location
   * @param idle
   * @param keepalive
   * @param appConfigService
   * @param route
   */
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private surveyReviewService: SurveyReviewService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public loaderService: LoaderService,
    private fb: FormBuilder,
    private location: Location,
    public idle: Idle,
    private keepalive: Keepalive,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
   
    //window.location.reload();
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(this.appConfigService?.config.survey_review_idle_time);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(this.appConfigService?.config.survey_review_timeout_time);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.showTimeoutAlert = false;
    });
    idle.onTimeout.subscribe((c: any) => {
      this.timedOut = true;
      this.counter =
        this.counter -
        this.appConfigService?.config?.survey_review_idle_time -
        this.appConfigService?.config?.survey_review_timeout_time;
      if (this.counter >= 0) {
        this.counter;
      } else {
        this.counter = 0;
      }
      this.showTimeoutAlert = false;
      this.showReviewPaused = true;
      this.pauseTimer();
      this.loaderService.show();
      const requestObj = {
        patientSurveyRespId: this.dashboardService.surveyIdValue,
        clinicianId: this.currentUserHeaderInfo.userId,
        totalReviewTime: this.counter,
        remarks: this.isRoleAssistant
          ? this.remarksDropDownValue?.value
          : this.remarks,
        // response: this.surveyResponse,
      };

      let surveyIdValue = this.dashboardService.surveyIdValue;
      if (surveyIdValue === null) {
        let url = window.location.href;

        surveyIdValue = parseInt(url.substring(url.lastIndexOf('/') + 1));
      }
      this.surveyReviewDraftSubscription = this.surveyReviewService
        .draftReviewSurvey(requestObj, surveyIdValue)
        .subscribe(
          (data) => {
            this.loaderService.hide();
          },
          (err) => {
            this.loaderService.hide();
            console.log(err);
          }
        );
    });
    idle.onIdleStart.subscribe(() => {
      this.showTimeoutAlert = true;
    });
    idle.onTimeoutWarning.subscribe((countdown: any) => {
      this.countdown = countdown;
    });

    this.surveyId = this.dashboardService.surveyIdValue;
    this.getSurveyResponseData();
    this.surveyReviewCompleteForm.controls['message'].disable();
  }

  /**
   * Gets survey Response data
   */
  getSurveyResponseData() {
    this.loaderService.show();
    if (this.surveyId === null) {
      let url = window.location.href;
      this.surveyId = parseInt(url.substring(url.lastIndexOf('/') + 1));
    }

    this.surveyReviewSubscription = this.surveyReviewService
      .sendSurveyReviewData(this.surveyId)
      .subscribe(
        (res: SurveyReviewResponse) => {
          this.loaderService.hide();
          this.surveyDataReview = res;

          const { score, survey, status, signOffSurvey } =
            this.surveyDataReview;
          this.cycleId = res?.response?.cycleId;
          this.counter = res?.reviewTime | 0;
          if (res?.spentTime) {
            this.isSpentTime = true;
            this.spentTime = res?.spentTime;
          }

          this.signOff = signOffSurvey;
          this.surveyResponseScore = score;
          this.painStatus = status.toLowerCase();
          if (this.isUpperCase(status)) {
            this.painStatus = status;
          }
          /**
           * There are two type of Survey for now
           * 1. Daily Survey
           * 2. Bi Weekly Survey
           */
          this.surveyType = survey;
          // this.surveyResponseId = this.dashboardService.surveyIdValue;
          this.surveyResponse = res?.response;

          /**
           * Patient details
           * Patient Disorders
           * Patient History
           */
          if (this.surveyDataReview?.patient != null) {
            this.patientDetails = this.surveyDataReview?.patient;
          }
          if (this.surveyDataReview?.patient?.diagnoses != null) {
            this.patientDisorders = this.surveyDataReview?.patient?.diagnoses;
          }
          if (this.surveyDataReview?.patient?.comorbidities != null) {
            this.patientComorbidities =
              this.surveyDataReview?.patient?.comorbidities;
          }
          if (this.surveyDataReview?.patient.patientHistory != null) {
            this.patientHistory =
              this.surveyDataReview?.patient?.patientHistory;
          }
          if (this.surveyDataReview?.response.questions != null) {
            const allQuestions = this.surveyDataReview?.response.questions;

            allQuestions.filter((e) => {
              if (e.question.dashboardType == 'Reading') {
                this.dispIconData.push(e);
              }
            });
            allQuestions.filter((e) => {
              if (e.question.dashboardType != 'Reading') {
                this.dispIconData.push(e);
              }
            });

            for (let i = 0; i < this.dispIconData.length; i++) {
              this.chartsData.push(this.dispIconData[i]);
              if (this.dispIconData[i].additionalInfo) {
                this.chartsData.push(
                  this.dispIconData[i].additionalInfo?.[0] as Questions
                );
              }
            }

            this.msgsForClinician = this.chartsData.filter(
              (o: any) => o.question.questionLabel == 'Message for Clinician'
            );
            this.chartsData = this.chartsData.filter(
              (o: any) =>
                // o.question.dashboardType !== '' &&
                o.question.questionLabel !== 'Message for Clinician'
            );
          }

          /**
           * Charts data Extraction
           * Based on Question response
           *
           */

          if (this.surveyDataReview?.response?.questions != null) {
            this.responseQuestions = this.surveyDataReview?.response?.questions;

            const painScoreQuestionObj = this.responseQuestions.filter(
              (o: any) => o.id === 1
            );

            // this.painDetails = {
            //   Options: this.painScoreOptions,
            //   Labels: this.painScoreLabels,
            //   Type: 'line',
            //   Legend: false,
            //   Annotation: [pluginAnnotation],
            //   Data: [
            //     {
            //       data: this.painScoreData[0].data,
            //     },
            //   ],
            // };

            if (this.painDetails != null) {
              this.charts.push(this.painDetails);
            }

            // this.cravingsDetails = {
            //   Options: this.cravingsScoreOptions,
            //   Labels: this.cravingsScoreLabels,
            //   Type: 'line',
            //   Legend: false,
            //   Annotation: [pluginAnnotation],
            //   Data: [
            //     {
            //       data: this.cravingsScoreData[0].data,
            //     },
            //   ],
            // };

            if (this.cravingsDetails != null) {
              this.charts.push(this.cravingsDetails);
            }

            // Patient Message

            const patientMessageQuestionObj = this.responseQuestions.filter(
              (o: any) => o.id === 4
            );

            this.patientMessage = patientMessageQuestionObj[0]?.question.value;
          }

          /**
           * Patient Review Histories
           */
          if (this.surveyDataReview?.reviewHistory != null) {
            // this.reviewPatientHistory = this.surveyDataReview?.reviewHistory;
          }

          if (this.surveyDataReview?.recentNotes != null) {
            // this.recentNotes = this.surveyDataReview?.recentNotes;
          }
        },
        (err: any) => {
          if ((err.status = 500)) {
            this.showErrorDialog = true;
            this.error = err.error.message;
            this.stopTimer();
          }
          this.loaderService.hide();
        }
      );
  }

  showTimeoutAlert: boolean = false;
  countdown!: number;
  remarksDropDownValue: any;
  /**
   * Hides Timeout Alert Dialog
   */
  hideTimeoutAlertDialog() {
    this.showTimeoutAlert = false;
  }
  showReviewPaused: boolean = false;
  /**
   * Hides Review Paused Dialog
   */
  hideReviewPausedDialog() {
    this.showReviewPaused = false;
  }

  /**
   * Redirects to dashboard
   */
  redirectToDashboard() {
    localStorage.setItem('surveyReviewPopup', String(false));
    this.hideTableRow = true;
    localStorage.setItem('hideTableRow', String(this.hideTableRow));
    this.dashboardService.flagSubject.next(false);
    this.dashboardService.surveyReviewIdNull();
    this.router.navigate(['/dashboard']);
  }

  /**
   * Continue Survey Review
   */
  continueSurveyReview() {
    this.hideReviewPausedDialog();
    this.resumeTimer();
    this.resetInactivityTimer();
  }

  /**
   * Cancels Survey Review
   */
  cancelSurveyReview() {
    this.cancelSurvey();
  }

  /**
   * Resets Inactivity Timer
   */
  resetInactivityTimer() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  /**
   * Stops Inactivity Timer
   */
  stopInactivityTimer() {
    this.idle.stop();
  }

  /**
   * Component on init hook
   */
  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.startTimer();
    //this.authService.isMonitorPlanSubject.next(true);
    this.surveyReviewService
      .getSiteUsersByRole(this.siteId)
      .subscribe((res: any) => {
        this.physiciansList = res;
        this.physiciansList.filter((o: any) => {
          if (o.id == this.loggedInUserId) {
            this.newFilteredAddReviewNoteArray.push({
              name: o.username,
              id: o.id,
            });
          }
        });
        this.physiciansList.forEach((o: any) => {
          if (this.newFilteredAddReviewNoteArray.length > 0) {
            if (o.id != this.loggedInUserId) {
              this.newFilteredAddReviewNoteArray.push({
                name: o.username,
                id: o.id,
              });
            }
          }
        });
        this.selectedAddReviewNotePhysician =
          this.newFilteredAddReviewNoteArray[0].name;
        this.selectedAddReviewNotePhysicianId =
          this.newFilteredAddReviewNoteArray[0].id;
      });

    const url = window.location.href;
    // Define a regular expression pattern to match "/survey-response/{surveyId}"
    const pattern = /\/survey-response\/\d+$/;
    // Check if the URL matches the pattern
    if (pattern.test(url)) {
      this.fullScreen = true;
    } else {
      this.fullScreen = false;
    }
  }

  onClick(event: any) { }
  ngAfterViewInit() { }

  /**
   * Survey Review Reactive form
   */
  surveyReviewForm = this.fb.group({
    selectedPhysician: ['', Validators.compose([Validators.required])],
    escalationNotes: ['', Validators.compose([Validators.required])],
  });

  /**
   * Survey Review Reactive form
   */
  surveyReviewCompleteForm = this.fb.group({
    reviewRemark: '',
    messageCheck: new FormControl(),
    message: ['', Validators.required],
  });

  /**
   * Add Review Note Reactive Form
   */
  addReviewNoteFormGroup = this.fb.group({
    physician: [''],
    reviewNotes: ['', Validators.compose([Validators.required])],
    reviewTimeCheck: new FormControl(),
    time: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    ],
  });

  /**
   * On time review checkbox check event
   * @param e
   */
  timeReviewCheckOnChange(e: any) {
    this.addReviewNoteFormGroup.controls.reviewTimeCheck.setValue(e.checked);
    if (e.checked) {
      this.displayTimeOnCheck = true;
    } else {
      this.addReviewNoteFormGroup.controls['time'].reset();
      this.displayTimeOnCheck = false;
    }
  }

  /**
   * On messeage checkbox check event
   * @param _event
   */
  messageCheckOnChange(_event: any) {
    this.surveyReviewCompleteForm.controls.messageCheck.setValue(
      _event.checked
    );
    if (_event.checked) {
      this.surveyReviewCompleteForm.controls['message'].enable();
    } else {
      this.surveyReviewCompleteForm.controls['message'].reset();
      this.surveyReviewCompleteForm.controls['message'].disable();
    }
  }

  /**
   * Add Review Note - Invalid form
   * @returns boolean value
   */
  IsAddReviewNoteInvalid() {
    if (!this.displayTimeOnCheck) {
      if (this.addReviewNoteFormGroup.controls.reviewNotes.valid) {
        return false;
      }
    }
    if (this.displayTimeOnCheck) {
      if (this.addReviewNoteFormGroup.valid) {
        return false;
      }
    }
    return true;
  }

  /**
   * IsInvalid form, return false if form is true
   */
  IsInvalid() {
    if (this.surveyReviewForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * IsInvalid form, return false if form is true
   */
  IsCompleteSurveyInvalid() {
    if (this.surveyReviewCompleteForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Component on-destroy hook
   */
  ngOnDestroy() {
    // this.dataServiceSubscription.unsubscribe();
    this.surveyReviewDraftSubscription.unsubscribe();
    this.surveyReviewSubscription.unsubscribe();
    this.stopBackGroundUpdate();
    this.remarksDropdownDataSubscription.unsubscribe();
    this.idle.stop();
    // this.authService.isMonitorPlanSubject.next(false);
  }

  /**
   * Start Timer
   */
  startTimer() {
    if (!this.startTimerFlag) {
      this.startTimerFlag = true;
      let currentDate = new Date();
      this.startTime = this.formatTimeInHoursMinutesSeconds(currentDate);
      this.interval = setInterval(() => {
        this.counter++;
      }, 1000);

      // if (!this.isRoleAssistant && this.surveyData.status !== 'Escalated') {
      // this.startBackgroundUpdater();
      this.resetInactivityTimer();
      // }
    }
  }

  /**
   * Resume Timer
   */
  resumeTimer() {
    this.paused = false;
    if (!this.startTimerFlag) {
      this.startTimerFlag = true;
      this.endTimerFlag = false;
      this.stopBackGroundUpdate();
      this.stopInactivityTimer();
    }

    this.interval = setInterval(() => {
      this.counter++;
    }, 1000);
    //if (!this.isRoleAssistant && this.surveyData.status !== 'Escalated') {
    // this.startBackgroundUpdater();
    this.resetInactivityTimer();
    // }
  }

  /**
   * Pause Timer
   */
  pauseTimer() {
    clearInterval(this.interval);
    this.paused = true;
    this.stopBackGroundUpdate();
    this.stopInactivityTimer();
  }

  /**
   * Stop Timer
   */
  stopTimer() {
    this.paused = true;
    this.startTimerFlag = false;
    this.endTimerFlag = true;
    let currentDate = new Date();
    this.endTime = this.formatTimeInHoursMinutesSeconds(currentDate);
    clearInterval(this.interval);
    this.stopBackGroundUpdate();
    this.stopInactivityTimer();
  }

  /**
   * Cancel Survey
   */
  cancelSurvey() {
    localStorage.setItem('surveyReviewPopup', String(false));
    this.dashboardService.flagSubject.next(false);
    this.dashboardService.surveyReviewIdNull();
  }

  /**
   * Start background updater to update review time.
   */
  // startBackgroundUpdater() {
  //   // this.backgroundUpdaterId = setInterval(()=>{
  //   this.backgroundUpdaterSubscription = interval(
  //     this.appConfigService.config.survey_background_draft_interval
  //   )
  //     .pipe()
  //     .subscribe(() => {
  //       const requestObj = {
  //         clinicianId: this.currentUserHeaderInfo.userId,
  //         totalReviewTime: this.counter,
  //         remarks: this.isRoleAssistant
  //           ? this.remarksDropDownValue?.value
  //           : this.remarks,
  //       };

  //       let surveyIdValue = this.dashboardService.surveyIdValue;
  //       if (surveyIdValue === null) {
  //         let url = window.location.href;

  //         surveyIdValue = parseInt(url.substring(url.lastIndexOf('/') + 1));
  //       }

  //       this.surveyReviewService
  //         .draftReviewSurvey(requestObj, surveyIdValue)

  //         .subscribe(
  //           () => { },
  //           (err: any) => console.log(err)
  //         );
  //     });
  // }

  /**
   * Stop Backgroung updater
   */
  stopBackGroundUpdate() {
    clearInterval(this.backgroundUpdaterId);
    this.backgroundUpdaterSubscription.unsubscribe();
  }

  /**
   * Get Remarks Dropdown Data
   */
  getRemarksDropdownData() {
    this.remarksDropdownDataSubscription = this.surveyReviewService
      .getRemarksDropDownData()
      .subscribe(
        (res: any) => {
          this.remarksDropdwonData = res;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  /**
   * Formats Time in Hours, Minutes and Seconds format
   * @param date
   * @returns
   */
  formatTimeInHoursMinutesSeconds(date: Date): string {
    const options: any = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleTimeString('en-US', options);
  }

  /**
   * Escalates Survey
   */
  escalateSurvey() {
    this.loaderService.show();
    this.stopTimer();
    this.displayEscalationDialog = false;
    let surveyEscalationRequest = {
      status: this.ESCALATED,
      cycleId: this.cycleId,
      reviewRemark: null,
      reviewTime: this.counter,
      escalatedTo: this.escalatedTo,
      reviewStartTime: this.startTime,
      reviewEndTime: this.endTime,
      escalatedNotes: this.surveyReviewForm.value.escalationNotes,
    };

    this.surveyReviewService
      .updateSurveyReviewTime(
        surveyEscalationRequest,
        this.surveyDataReview?.surveyResponseId
      )
      .subscribe(
        (res: any) => {
          this.loaderService.hide();
          this.messageService.add({
            severity: TOAST_SEVERITY_SUCCESS,
            summary: 'Success Message',
            detail: 'Survey Escalated Successfully.',
          });
          setTimeout(() => {
            localStorage.setItem('surveyReviewPopup', String(false));
            this.hideTableRow = true;
            localStorage.setItem('hideTableRow', String(this.hideTableRow));
            this.dashboardService.flagSubject.next(false);
            this.dashboardService.surveyReviewIdNull();
          }, 2000);
        },
        (err: any) => {
          this.loaderService.hide();
          this.messageService.add({
            severity: TOAST_SEVERITY_ERROR,
            summary: 'Error Message',
            detail: err?.error?.message,
          });
        }
      );
  }

  /**
   * resets the add note form
   */
  resetAddNoteForm() {
    this.addReviewNoteFormGroup.controls['physician'].setValue(
      this.newFilteredAddReviewNoteArray[0].name
    );
    this.addReviewNoteFormGroup.controls['reviewNotes'].reset();
    this.addReviewNoteFormGroup.controls['reviewTimeCheck'].reset();
    this.addReviewNoteFormGroup.controls['time'].reset();
    this.selectedAddReviewNotePhysicianId =
      this.newFilteredAddReviewNoteArray[0].id;
    this.displayTimeOnCheck = false;
  }

  /**
   * Add Review Note in survey
   */
  onSubmitAddReviewNote() {
    this.loaderService.show();
    let convertedReviewTimeToSeconds =
    this.displayAddNotesDialog = false;
    let addNoteRequest = {
      cycleId: this.cycleId,
      note: this.addReviewNoteFormGroup.value.reviewNotes,
      status: 'NotesAdded',
      reviewTime: convertedReviewTimeToSeconds,
      clinicianId: this.selectedAddReviewNotePhysicianId,
    };

    this.surveyReviewService
      .sendAddNoteData(addNoteRequest, this.surveyDataReview?.surveyResponseId)
      .subscribe(
        (res: any) => {
          this.loaderService.hide();
          this.messageService.add({
            severity: TOAST_SEVERITY_SUCCESS,
            summary: 'Success Message',
            detail: 'Added note successfully.',
          });
          setTimeout(() => {
            this.loaderService.show();
            this.surveyReviewService
              .sendSurveyReviewData(this.surveyId)
              .subscribe((res: SurveyReviewResponse) => {
                this.loaderService.hide();
                this.date = new Date();
                this.surveyDataReview = res;
                if (this.surveyDataReview?.reviewHistory != null) {
                  // this.reviewPatientHistory =
                  //   this.surveyDataReview?.reviewHistory;
                }
              });
            this.resetAddNoteForm();
          }, 3000);
        },
        (err: any) => {
          this.loaderService.hide();
          this.messageService.add({
            severity: TOAST_SEVERITY_ERROR,
            summary: 'Error Message',
            detail: err?.error?.message,
          });
          setTimeout(() => {
            this.resetAddNoteForm();
          }, 1000);
        }
      );
  }

  /**
   * Closes Survey
   */
  // completeSurvey() {
  //   this.loaderService.show();
  //   this.stopTimer();
  //   this.displayCompleteSurveyDialog = false;
  //   const surveyEscalationRequest: surveyCompletionRequest = {
  //     status: this.isRoleQhp || this.signOff ? this.COMPLETED : this.SIGNOFF,
  //     cycleId: this.cycleId,
  //     reviewRemark:
  //       this.isRoleQhp || this.signOff
  //         ? this.surveyReviewCompleteForm.value.reviewRemark
  //         : null,
  //     reviewTime: this.counter,
  //     escalatedTo: null,
  //     reviewStartTime: this.startTime,
  //     reviewEndTime: this.endTime,
  //     escalatedNotes:
  //       // this.isRoleAssistant || !this.isRoleQhp
  //       !this.isRoleQhp
  //         ? this.surveyReviewCompleteForm.value.reviewRemark.value
  //         : null,
  //     sendMessage: this.surveyReviewCompleteForm.value.messageCheck,
  //     patientMessage: '',
  //   };

  //   if (this.surveyReviewCompleteForm.value.messageCheck) {
  //     surveyEscalationRequest.patientMessage =
  //       this.surveyReviewCompleteForm.controls.message.value;
  //   } else {
  //     delete surveyEscalationRequest.patientMessage;
  //   }

  //   this.surveyReviewService
  //     .updateSurveyReviewTime(
  //       surveyEscalationRequest,
  //       this.surveyDataReview?.surveyResponseId
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         this.loaderService.hide();
  //         this.messageService.add({
  //           severity: TOAST_SEVERITY_SUCCESS,
  //           summary: 'Success Message',
  //           detail:
  //             // (this.isRoleAssistant || !this.isRoleQhp)
  //             //   ? 'Survey Signed Off Successfully.'
  //             //   : (this.isRoleQhp || this.signOff)
  //             //   ? 'Survey Closed Successfully' : ''
  //             this.isRoleQhp || this.signOff
  //               ? 'Survey Closed Successfully'
  //               : 'Survey Signed Off Successfully.',
  //         });
  //         setTimeout(() => {
  //           localStorage.setItem('surveyReviewPopup', String(false));
  //           this.hideTableRow = true;
  //           localStorage.setItem('hideTableRow', String(this.hideTableRow));
  //           this.dashboardService.flagSubject.next(false);
  //           this.dashboardService.surveyReviewIdNull();
  //         }, 2000);
  //       },
  //       (err: any) => {
  //         this.loaderService.hide();
  //         this.messageService.add({
  //           severity: TOAST_SEVERITY_ERROR,
  //           summary: 'Error Message',
  //           detail: err?.error?.message,
  //         });
  //       }
  //     );
  // }

  /**
   * Shows Escalation Dialog
   */
  showEscalationDialog() {
    this.surveyReviewService.getSiteUsersByRole(this.siteId).subscribe(
      (res: any) => {
        if (res) {
          this.physiciansList = res.filter(
            (physician: any) => physician.id != this.loggedInUserId
          );
          this.physiciansList.forEach((physician: any, index: number) => {
            this.physiciansList[index].fullName = physician.username;
          });
          this.loaderService.hide();
        }
      },
      (err: any) => {
        this.loaderService.hide();
      }
    );
    this.displayEscalationDialog = true;
  }

  /**
   * Shows Escalation Dialog
   */
  showCompleteSurveyDialog() {
    this.surveyReviewService.getPreDefinedRemarks('remark').subscribe(
      (res: any) => {
        if (res) {
          this.preDefinedRemarks = res;
          this.loaderService.hide();
        }
      },
      (err: any) => {
        this.loaderService.hide();
      }
    );
    this.displayCompleteSurveyDialog = true;
  }

  /**
   * shows add notes dialog
   */
  showAddNotesDialog() {
    this.date = new Date();
    this.displayAddNotesDialog = true;
  }

  /**
   * Hides Escalation Dialog
   */
  hideEscalationDialog() {
    this.surveyReviewForm.controls['selectedPhysician'].reset();
    this.surveyReviewForm.controls['escalationNotes'].reset();
    this.displayEscalationDialog = false;
  }

  /**
   * Hides Survey Complete Dialog
   */
  hideSurveyCompleteDialog() {
    this.surveyReviewCompleteForm.controls['reviewRemark'].reset();
    this.surveyReviewCompleteForm.controls['messageCheck'].reset();
    this.surveyReviewCompleteForm.controls['message'].reset();
    this.displayCompleteSurveyDialog = false;
  }

  /**
   * Hides Add Review Note Dialog
   */
  hideAddReviewNoteDialog() {
    this.resetAddNoteForm();
    this.displayAddNotesDialog = false;
  }

  /**
   * Updates Escalated to a value
   * @param selectedPhysician
   */
  updateEscalatedTo(selectedPhysician: any) {
    this.escalatedTo = selectedPhysician.value.id;
  }

  /**
   * Updates Escalated to a value
   * @param selectedPhysician
   */
  updatereviewRemark(reviewRemark: any) {
    this.reviewRemark = reviewRemark.value.id;
  }

  /**
   * Updates add note to a value
   * @param selectedPhysician
   */
  onAddNotePhysicianChange(selectedPhysician: any) {
    this.selectedAddReviewNotePhysicianId = selectedPhysician.value;
  }

  /**
   * Hides Escalation Staff Dialog
   */
  hideEscalationStaffDialog() {
    this.showEscalatedAlert = false;
  }

  /**
   * Navigates back to previous visited page
   */
  goBack() {
    this.surveyReviewPopup = JSON.parse(
      localStorage.getItem('surveyReviewPopup')!
    );
    if (this.surveyReviewPopup == true) {
      localStorage.setItem('surveyReviewPopup', String(false));
    }
    this.dashboardService.flagSubject.next(false);
    this.dashboardService.surveyReviewIdNull();
    this.router.navigate(['/dashboard']);
  }

  /**
   * Checks chart data
   * @returns boolean
   */
  checkChartData() {
    if (this.charts != null) return true;
    else return false;
  }

  /**
   * formats seconds to time
   * @param value
   * @returns hours and minutes
   */
  formatSecondsToTime(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  /**
   * gets survey percentage
   * @param day
   * @returns percentage
   */
  getSurveyPercentage(day: any) {
    if (this.isRTMUser) {
      this.actualPercentage = Number((this.dayPercentage1 * day).toFixed(2));
      if (this.actualPercentage == 99.99) {
        this.actualPercentage = 100;
      }
    } else {
      this.actualPercentage = Number((this.dayPercentage * day).toFixed(2));
      if (this.actualPercentage == 99.96) {
        this.actualPercentage = 100;
      }
    }
    return this.actualPercentage;
  }

  /**
   * Converts the string to upper case
   * @param status
   * @returns status in upper case
   */
  isUpperCase(status: string) {
    return status == status.toUpperCase();
  }
}