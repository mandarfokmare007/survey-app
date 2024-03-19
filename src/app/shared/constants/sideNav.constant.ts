export const SIDENAV_LINKS = [
  {
    path: '/dashboard',
    navName: 'Dashboard',
    navIcon: 'icon-dashboard',
  },
  {
    path: '/manage-patient',
    navName: 'Patients',
    navIcon: 'icon-patients',
  },
  {
    path: '/reports',
    navName: 'Reports',
    navIcon: 'icon-reports',
    subNavLinks: [
      {
        path: '/reports/patient-activity-report',
        navName: 'Patient Activity',
        navIcon: 'icon-reports',
      },
      {
        path: '/reports/cycle-review',
        navName: 'Cycle Review',
        navIcon: 'icon-reports',
      },
    ],
  },
];
