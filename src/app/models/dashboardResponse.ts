export interface DashboardResponse {
  completed_surveys: CompletedResponse[];
  escalated_surveys: EscalatedResponse[];
  pending_surveys: PendingResponse[];
  signOff_surveys: PendingResponse[] | null;
  todays_activity: DashboardTodaysActivity;
  current_status: DashboardCurrentStatus;
  current_timestamp: number;
}

export interface DashboardTodaysActivity {
  syncedAt: string;
  patientsInRed: number;
  surveyRequests: number;
  reviewedSurveys: number;
  unansweredSurveys: number;
}

export interface DashboardCurrentStatus {
  escalatedSurvey: number;
  offtrackPatient: number;
  unregisteredPatients: number;
  readyForCycleReview: number;
}

export interface PatientSurveyAssignmentsResponse {
  name: string;
  count: number;
}

export interface TopPatientDiagnosisResponse {
  name: string;
  value: number;
}

export interface EscalatedResponse {
  name: string;
  cycle: string;
  status: string;
  survey: string;
  patientid: number;
  openDuration: string;
  prevFiveDays: PrevFiveDay[];
  submittedDate: string;
  surveyResponseId: number;
}

export interface PrevFiveDay {
  score: string;
}

export interface PendingResponse {
  name: string;
  cycle: string;
  status: string;
  survey: string;
  cycleEnd: string;
  patientid: number;
  openDuration: any;
  prevFiveDays: PrevFiveDay[] | null;
  submittedDate: string;
  surveyResponseId: any;
}

export interface CompletedResponse {
  name: string;
  cycle: string;
  status: string;
  survey: string;
  closedBy: string;
  patientid: number;
  completedDate: string;
  escalatedStatus: string;
  surveyResponseId: number;
}

export interface Headers {
  field: string;
  header: string;
}
export interface cardDataItem {
cycleInfo: string;
name: string;
phone: string;
enrolledDays: string;
surveyName: string;
}

export interface printMatricsDashboardData {
 belowTarget: BelowTargetResponseData[];
 escalatedSurveys: DashboardResponseData[];
 readyForCycleReview: DashboardResponseData[];
 unregisteredPatients: UnregisteredPatientsResponseData[];
 unansweredSurveys: DashboardResponseData[];
}

export interface DashboardResponseData {
  cycleInfo?: string;
  name: string;
  phone: string;
  surveyName?: string;
  cycleNum?: string;
  enrolledDays?: string;
}

export interface BelowTargetResponseData {
  id: number;
  lastReminder: string;
  lastSubmittedDate: string;
  name: string;
  phone: string;
  prevFiveDays: PrevFiveDay[] | null;
}


export interface UnregisteredPatientsResponseData {
  patientId: number;
  lastReminder: string;
  lastSubmittedDate: string;
  name: string;
  phone: string;
  prevFiveDays: PrevFiveDay[] | null;
}