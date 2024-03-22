import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { filter } from 'rxjs';
import { cycleReport } from 'src/app/models/reports';
import { LoaderService } from 'src/app/services/loader.service';
import { UrlService } from 'src/app/services/previous-url.service';
import { ReportsService } from 'src/app/services/reports.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { PAGE_NAME } from 'src/app/shared/constants/cycle-review-detail.constant';
import { TABLE_COLUMNS } from 'src/app/shared/constants/cycle-review.constant';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  reports: cycleReport[] = [];
  reportsToFilter: cycleReport[] = [];
  filteredReports: cycleReport[] = [];
  selectedView:any;
  selectedDropdownValue: any = {};
  selectedDropdownValueCopy: any = {};
  pageName: string = PAGE_NAME;
  tableColumns: string[] = TABLE_COLUMNS;
  previousUrl: any = null;
  previousUrlCopy: any = null;
  currentUrl: any = null;
  today: any;
  last6Months: any;
  patientId!: number;
  cycleId?: number;
  cycleReviewToggleItems: MenuItem[] = [];
  currentUser: any = JSON.parse(localStorage.getItem('headerObject')!);
  siteName: any = this.currentUser.siteName;
  isBlockedAccount: boolean = this.currentUser?.isClientBlocked;

   monthNames = [
    { month: 'Jan', monthVal: '0' },
    { month: 'Feb', monthVal: '1' },
    { month: 'Mar', monthVal: '2' },
    { month: 'Apr', monthVal: '3' },
    { month: 'May', monthVal: '4' },
    { month: 'Jun', monthVal: '5' },
    { month: 'Jul', monthVal: '6' },
    { month: 'Aug', monthVal: '7' },
    { month: 'Sep', monthVal: '8' },
    { month: 'Oct', monthVal: '9' },
    { month: 'Nov', monthVal: '10' },
    { month: 'Dec', monthVal: '11' },
  ]

  /**
   * Constructor
   * @param router
   * @param messageService
   * @param loaderService
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private reportService: ReportsService,
    private sharedService: SharedDataService,
  ) {
    this.sharedService.currentcycleReviewDDValue.subscribe((valObj) => {
      this.selectedDropdownValue = valObj;
    });
    // this.urlService.previousUrl$.subscribe((value) => {
    //   if (value != null) {
    //     this.previousUrlCopy = value;
    //   }
    // });
  }

  /**
   * get patient details
   * @param id
   */
  getPatientDetails(id: any) {
    this.patientId = id;
  }

  /**
   * Gets the last six months 
   */
  getLastSixMonth() { 
    this.today = new Date();
    let month = this.today.getMonth();
    let year = this.today.getFullYear();
    this.last6Months = [{ month: 'Pending', monthVal: '12' }];

    let i = 0;
    do {
      this.last6Months.push({
        month:
          this.monthNames[parseInt((month > 9 ? '' : '0') + month)].month,
        monthVal: month.toString(),
      })
      if (month == 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
      i++;
    } while (i < 6)
  }

  /**
   * oninit
   * @param id
   */
  ngOnInit(): void {
    this.getPatientCycleReviews();
    this.getLastSixMonth();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        // this.urlService.setPreviousUrl(this.previousUrl);
        const routeNamePath = this.previousUrlCopy.split('/');
        if (
          routeNamePath[2] != undefined &&
          routeNamePath[2] == 'cycle-review-detail'
        ) {
          this.sharedService.updatecycleReviewDDValue(
            this.selectedDropdownValueCopy
          );
        } else {
          this.sharedService.updatecycleReviewDDValue(
            this.last6Months[0]
          );
        }
      });
  }

  /**
   * to filter data based on selected value
   * @param eve
   */
  filterReports(selectedDropdownValue: any) {
    this.selectedDropdownValueCopy = selectedDropdownValue?.value;
    if(selectedDropdownValue == undefined) {
      this.selectedDropdownValueCopy = selectedDropdownValue?.value?.month;
    }
    if(this.selectedDropdownValueCopy == undefined) {
      this.selectedDropdownValueCopy = selectedDropdownValue;
    }
    this.sharedService.updatecycleReviewDDValue(selectedDropdownValue?.value);
    this.filteredReports = [];
    if(selectedDropdownValue == undefined){
      this.selectedView = this.selectedDropdownValueCopy;
    }
    if(selectedDropdownValue.value){
      this.selectedView = selectedDropdownValue.value.month;
    }
    if (selectedDropdownValue.month == 'Pending') {
      this.selectedView = selectedDropdownValue.month;
    }
     else {
      if(selectedDropdownValue.value){
        this.selectedView = selectedDropdownValue.value.month;
      } else {
        this.selectedView = selectedDropdownValue.month;
      }
    }
    if (this.selectedView == 'Pending') {
      this.filteredReports = this.reportsToFilter.filter(
        (item) => item.isReviewed == 0
      );
    } else {
      this.filteredReports = this.reportsToFilter.filter((item) =>
        item.cycleEndDate.includes(this.selectedView)
      );
    }
    this.reports = this.filteredReports;
  }
  /**
   * get patient details
   * @param id
   */
  getCycleReviewDetails(report: any) {
    this.loaderService.show();
    this.cycleId = report.cycleId;
    setTimeout(()=>{
      this.goToCycleReviewDetails();
    },100)
  }

  /**
   * navigate to details page
   * @param cycleId
   */
  goToCycleReviewDetails() {
    this.loaderService.show();
    if (this.isBlockedAccount == true) {
      return;
    } else {
        this.router.navigate([`/reports/cycle-review-detail/${this.cycleId}`]);
    }
  }

  /**
   * get cycle reviews
   * @param siteId
   */
  getPatientCycleReviews() {
    this.loaderService.show();
    this.reportService
      .getPatientCycleReviews(this.currentUser?.siteId)
      .subscribe(
        (res: any) => {
          if (res != null) {
            if (res.cycleReport != null) {
              this.reportsToFilter = res.cycleReport;
              this.reports = res.cycleReport;
            }
              this.filterReports(this.selectedDropdownValue);
          }
          this.loaderService.hide();
        },
        (err: any) => {
          this.loaderService.hide();
          console.log(err);
        }
      );
  }

  /**
   * Export Cycle review reports
   * @param id
   */
  export(): void {
    this.loaderService.show();
    this.reportService
      .exportCycleReviews(this.currentUser?.siteId, this.selectedView)
      .subscribe(
        (res: any) => {
          this.loaderService.hide();
          this.downloadFile(res, 'text/csv');
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Cycle Review Reports Exported successfully',
          });
        },
        (err: { error: { message: any; }; }) => {
          this.loaderService.hide();
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message,
          });
        }
      );
  }
  downloadFile(data: any, type: string) {
    let sitename = this.siteName;
    if (this.siteName.length > 7) {
      sitename = this.siteName.substring(0, 7);
    }
    let date = new Date();
    let m = date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    let d = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();

    let dateFormat = date.getFullYear() + '-' + m + '-' + d;
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let anchor = document.createElement('a');
    anchor.download = 'Cycle_' + sitename + '_' + dateFormat + '.csv';
    anchor.href = url;
    anchor.click();
  }

}
