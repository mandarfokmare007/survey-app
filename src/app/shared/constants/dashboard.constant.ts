export const PAGE_HEADINGS = [
  'Patients - Survey Assignments',
  'Patient Status (Today)',
  'Top Patient Diagnosis',
  "Provider's Review",
];
export const NO_DATA_CHART = 'No Data Available to Plot';
export const AWAITING_RES_MSG = 'This item is still under awaiting response.';
export const PATIENT_SKIPPED_MSG = 'Patient skipped this survey.';
export const TABLE_COL_NAMES = [
  'Name',
  'Submitted Date',
  'Status',
  'Diagnosis',
  'Survey',
];
export const PBD_CHART_COLORS = [
  '#ef476f',
  '#ffd166',
  '#06d6a0',
  '#118ab2',
  '#073b4c',
];

export const TOTAL_PATIENT_CHART_COLORS = [
  {
    backgroundColor: ['#35B7E9'],
    barThickness: '30',
  },
  {
    backgroundColor: ['#E6D819'],
    barThickness: '30',
  },
];

export const TODAYSACTIVITIYPOPUPTABLECOLUMNS = [
  { field: 'name', header: 'Patient Name' },
  { field: 'phone', header: 'Phone' },
  { field: 'cycleInfo', header: 'Cycle Info' },
  { field: 'surveyName', header: 'Survey Type'}
];

export const UNREGISTEREDPOPUPTABLECOLUMNS = [
  { field: 'name', header: 'Patient Name' },
  { field: 'phone', header: 'Phone' },
  { field: 'enrolledDays', header: 'Enrolled Days' },
  { field: 'textReminder', header: ''},
  { field: 'lastReminder', header: 'Last Reminder'},
]

export const BELOWTARGETPOPUPTABLECOLUMNS = [
  { field: 'name', header: 'Patient Name' },
  { field: 'phone', header: 'Phone' },
  { field: 'previousFiveDays', header: ''},
  { field: 'lastSubmittedDate', header: 'Last Completed'},
  { field: 'textReminder', header: ''},
  { field: 'lastReminder', header: 'Last Reminder'},
];

export const ESCALATEDCOLS:{ field: string; header: string; }[] = [
  { field: 'status', header: 'Status' },
  { field: 'name', header: 'Patient' },
  { field: 'survey', header: 'Survey' },
  { field: 'submittedDate', header: 'Submitted Date' },
  { field: 'openDuration', header: 'Open Duration' },
  { field: 'cycle', header: 'Cycle' },
  { field: 'prevFiveDays', header: 'Prev 5 Days' },
];
export const PENDINGCOLS = [
  { field: 'status', header: 'Status' },
  { field: 'name', header: 'Patient' },
  { field: 'survey', header: 'Survey' },
  { field: 'submittedDate', header: 'Submitted Date' },
  { field: 'openDuration', header: 'Open Duration' },
  { field: 'cycle', header: 'Cycle' },
  { field: 'prevFiveDays', header: 'Prev 5 Days' },
];
export const SIGNOFFCOLS = [
  { field: 'status', header: 'Status' },
  { field: 'name', header: 'Patient' },
  { field: 'survey', header: 'Survey' },
  { field: 'submittedDate', header: 'Submitted Date' },
  { field: 'openDuration', header: 'Open Duration' },
  // { field: 'cycle', header: 'Cycle' },
  // { field: 'prevFiveDays', header: 'Prev 5 Days' },
];
export const COMPLETEDCOLS = [
  { field: 'status', header: 'Status' },
  { field: 'name', header: 'Patient' },
  { field: 'survey', header: 'Survey' },
  { field: 'cycle', header: 'Cycle' },
  { field: 'completedDate', header: 'Closed' },
  { field: 'closedBy', header: 'Closed By' },
  { field: 'escalatedStatus', header: '' },
];

export const READYFORCYCLEREVIEWPRINTTABLEDATA = [
  { field: 'name', header: 'Patient' },
  { field: 'cycleNum', header: 'Cycle Number' },
  { field: 'phone', header: 'Phone' }
];
