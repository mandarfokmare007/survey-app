export interface PatientActivityReportdResponse {
    data: report[];
    chart: ChartData[];
  }
  export interface report {
    completion: string;
    cycleDay: number;
    cycleNumber: number;
    patient: string;
    patientStatus: string;
    phone: string;
    reviewTime: string;
    status: string;
    survey: number;
    setup: string;
  }
  
  export interface PatientCycleReviewdResponse {
    cycleReport: cycleReport[];
  }
  export interface cycleReport {
    name: string;
    cycleNum: number;
    patientId: number;
    reviewTime: string;
    cycleEndDate: string;
    completionRate: string;
    reviewRemark: string;
    isReviewed: number;
  }
  
  export interface PatientBillingReportResponse {
    billingReport: billingReport[];
  }
  export interface billingReport {
    name: string;
    cycleIds: string;
    patientId: number;
    periodEnd: string;
    billingPeriod: number;
    interactions: number;
    setup: string;
    lastExportedDate: string;
    lastExportedBy: string;
  }
  
  export interface ChartData {
    name: string;
    value: number;
  }
  
  export interface ViewValues {
    name: string;
    value: string;
  }
  
  export interface TableColumns {
    colName: string;
    colWidth: string;
  }
  