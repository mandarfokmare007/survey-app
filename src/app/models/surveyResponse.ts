export interface SurveyReviewResponse {
    survey: string;
    openDuration: string;
    patient: PatientDetails;
    response: SurveyResponse;
    reviewHistory: history[];
    recentNotes: history[];
    score: number;
    signOffSurvey: boolean;
    submitted: string;
    reviewTime: number;
    spentTime: number;
    surveyId: string;
    status: string;
    surveyResponseId: number;
  }
  
  export interface PatientDetails {
    age: number;
    diagnoses: Disorders[];
    comorbidities: Disorders[];
    dob: string;
    gender: string;
    name: string;
    patientHistory: PatientHistory;
    phone: string;
    height: number;
    weight: string;
    patientId: number;
    completedAssessment:string;
  }
  
  export interface Disorders {
    id: number;
    name: string;
    value: string;
  }
  
  export interface PatientHistory {
    cycleEndDate: string;
    cycleDay: number;
    cycleNumber: number;
    cyclePercentage: string;
    cycleTarget: string;
    engagementTarget: string;
    overallSurveys: string;
    surveyPercentage: string;
    surveyTarget: string;
    cycleSurveys: string;
    cycleHistory: cycleHistory[];
    overallPercentage: string;
    overallTarget: string;
  }
  
  export interface cycleHistory {
    day: number;
    color: string;
    survey: string;
  }
  
  export interface option {
    alarming: boolean;
    label: string;
    selected: boolean;
    weightage: number;
  }
  
  export interface history {
    escalatedFrom: string;
    escalatedTo?: string;
    escalationDate: string;
    escalationNote: string | null;
    status: string;
    patientMessage?: string;
  }
  
  //not used
  export interface SurveyResponseObj {
    alreadyReviewed: boolean;
    daignosis_id: string;
    diagnosis: string;
    name: string;
    patientid: number;
    status: string;
    submittedDate: string;
    survey: string;
    surveyId: number;
  }
  
  export interface SurveyResponse {
    category: string;
    cycleId: number;
    day: number;
    questions: Questions[];
  }
  
  export interface Questions {
    additionalInfo?: AdditionalInfo[];
    bound?: string;
    id?: number;
    question: Question;
    questionId: number;
  }
  
  export interface Question {
    alarming: boolean;
    bound?: string | undefined;
    dashboardType: string;
    history: History[];
    options: option[];
    questionId: number;
    questionLabel: string;
    questionText: string;
    questionTypeName: string;
    required: boolean;
    showOnQuestionBank: boolean;
    status: string;
    uiType: string;
    value?: string;
  }
  export interface History {
    questionLabel: string;
    questionText: string;
    response: string;
    responseDate: string;
  }
  
  export interface Remarks {
    code: null | number;
    id: number;
    isActive: number;
    value: string;
  }
  
  export interface AdditionalInfo {
    question?: Question;
    questionId?: number;
    triggerValue: string;
  }
  
  export interface PhysicianList {
    id: number;
    username: string;
    age: number;
    careCoordinator: boolean;
    clientWideAccess: boolean;
    planAssigned: boolean;
    qhpUser: boolean;
    fullName?: string;
  }
  
  export interface surveyCompletionRequest {
    status: string;
    cycleId: number;
    reviewRemark: string;
    reviewTime: number;
    escalatedTo: null;
    reviewStartTime: string;
    reviewEndTime: string;
    escalatedNotes: null;
    sendMessage: boolean;
    patientMessage?: string;
  }
  
  export interface AssessmentData {
    question: {
      psrId: number;
      category: string;
      questionText: string;
      questionLabel: string;
      response: string;
    };
  }
  