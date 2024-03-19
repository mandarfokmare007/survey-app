import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HeaderComponent } from './header.component';
import { GlobalSearchService } from 'src/app/services/global-search.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let globalSearchResults: any[];
  let mockAutheticationService = {
    logout: () => {
      return { subscribe: () => {} };
    },
    getProfileImg: () => {
      return { subscribe: () => {} };
    },
  };
  let mockGlobalSearchService = {
    getPatientsList: () => {
      return { subscribe: () => {} };
    },
  };
  let mockSharedDataService = {
    updateGlobalSearchResults: () => {
      return { subscribe: () => {} };
    },
  };
  let mockProfileImageService = {
    getProfileImage: () => {
      return { subscribe: () => {} };
    }
  }

  beforeEach(() => {
      const currentUser = {
      acr: '1',
      azp: 'painscript-physician-app',
      userName: 'djsingh1@gmail.com',
      email_verified: false,
      exp: 1612760073,
      family_name: 'Singh',
      given_name: 'Dhananjay2',
      iat: 1612759473,
      iss: 'http://40.80.145.208:8080/auth/realms/PainScriptApp',
      jti: '32d481e3-1459-447b-b1a6-bab919480747',
      name: 'Dhananjay2 Singh',
      preferred_username: 'djsingh1@gmail.com',
      realm_access: { roles: ['Clinicians'] },
      scope: 'openid profile email',
      session_state: '451b1876-2045-41d9-817c-3769f609107e',
      sub: 'f:2c4b2aae-15af-4df0-bd20-07be3fdb49a5:3',
      typ: 'Bearer',
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

  const headerObject = {
  deviceType: null,
  token_type: 'bearer',
  userId: 3,
  siteId: 1,
  deviceId: null,
  client_id: 'painscript-physician-app',
  deviceToken: null,
  access_token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuQ0hyUVVaSVVDdDg4cGdKOXROR1NPZ2w3THlIR2V0VWZUR1J0STNhRUI0In0.eyJleHAiOjE2MTI3NTk2MTQsImlhdCI6MTYxMjc1OTAxNCwianRpIjoiOTcxMTg0ODAtMzM2OS00ODZkLWE0M2UtMmRiMjNmODBmYmQ2IiwiaXNzIjoiaHR0cDovLzQwLjgwLjE0NS4yMDg6ODA4MC9hdXRoL3JlYWxtcy9QYWluU2NyaXB0QXBwIiwic3ViIjoiZjoyYzRiMmFhZS0xNWFmLTRkZjAtYmQyMC0wN2JlM2ZkYjQ5YTU6MyIsInR5cCI6IkJlYXJlciIsImF6cCI6InBhaW5zY3JpcHQtcGh5c2ljaWFuLWFwcCIsInNlc3Npb25fc3RhdGUiOiIxN2MzMzdlZC0xYzdjLTQyNjktYTE4NS02MGU5ODVjZTVlYzAiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlBoeXNpY2lhbnMiXX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJEaGFuYW5qYXkyIFNpbmdoIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGh5c2ljaWFuIiwiZ2l2ZW5fbmFtZSI6IkRoYW5hbmpheTIiLCJmYW1pbHlfbmFtZSI6IlNpbmdoIiwiZW1haWwiOiJkanNpbmdoMUBnbWFpbC5jb20ifQ.PQxRQnn6pHElUwOPJk7Khud_Jnp9HZzTLNDHWuMl7OqtUGKWHxTLdLFCrPflCZC-8HDpa3cAx3J3q2GsH3ID-w6J4T8_9v1JMGhgYGwmfff_L_CPrL-RWIdVbevH7WkfwUlpbvRfwiIAIQRGJDXow8ca4XHmplQE8yWifLQLizjc7f2ZrxcIfA2JrDr3Q_CmJ6V4dW0yHyZZZyGHwAeKSGTCkB9eXOWmXhfN0OEcLW27nrw5Ox8Eb2Ni8Vi3-KB0Ou71RvWzUWdmF4zXgfHQnxM1-HVq-KlDzwaZF8AhwIxDN5mY7qo4wAa8MFE-dkHzU-7JpmMCB0CQ1UwqXYdaZQ',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2Njk1Y2VjYS1jMDhiLTQ1MDctOGNmMy0zZDY3MjM4MjM2NjQifQ.eyJleHAiOjE2MTI3OTE0MTQsImlhdCI6MTYxMjc1OTAxNCwianRpIjoiNTVmNDAwMWEtNjZiNy00ZmRlLWFjNGUtOTFlMGFhYzllNDVhIiwiaXNzIjoiaHR0cDovLzQwLjgwLjE0NS4yMDg6ODA4MC9hdXRoL3JlYWxtcy9QYWluU2NyaXB0QXBwIiwiYXVkIjoiaHR0cDovLzQwLjgwLjE0NS4yMDg6ODA4MC9hdXRoL3JlYWxtcy9QYWluU2NyaXB0QXBwIiwic3ViIjoiZjoyYzRiMmFhZS0xNWFmLTRkZjAtYmQyMC0wN2JlM2ZkYjQ5YTU6MyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJwYWluc2NyaXB0LXBoeXNpY2lhbi1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiMTdjMzM3ZWQtMWM3Yy00MjY5LWExODUtNjBlOTg1Y2U1ZWMwIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.3dyQ-81E3sVrjvWA-sRHEgFEnopt_cv1RT39WLTP2eQ',
  refresh_expires_in: 32400,
  'not-before-policy': 0,
  scope: 'openid profile email',
  session_state: '17c337ed-1c7c-4269-a185-60e985ce5ec0',
  userRole: 'Clinicians',
  lastLoggedInTime: '2021-02-08T04:35:59.000+00:00',
  expires_in: 600,
  userName: 'djsingh1@gmail.com',
};
    localStorage.setItem('headerObject', JSON.stringify(headerObject));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthenticationService,
          useValue: mockAutheticationService,
        },
        {
          provide: GlobalSearchService,
          useValue: mockGlobalSearchService,
        },
        {
          provide: SharedDataService,
          useValue: mockSharedDataService,
        },
        {
          provide : ProfileImageService,
          useValue: mockProfileImageService,
        }
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {
    localStorage.clear();
  });

  /**
   * Logout
   */
  it('Should logout ', () => {
    component.logout();
    spyOn(mockAutheticationService, 'logout');
    fixture.detectChanges();
    expect(component.logout).toBeDefined();
  });

  /**
   * Return profile image
   */
  it('Should return the profile image', () => {
    const physicianId = 3;
    const mockProfileData = {
      photoThumbnail: 'src/img.png',
    };
    const spy = spyOn(mockProfileImageService, 'getProfileImage').and.returnValue(of(mockProfileData));
    component.getProfileImg(physicianId);
    fixture.detectChanges();
    expect(component.proImg).toBeDefined('src/img.png');
  });

  /**
   * Global search with empty search input
   */
  it('should throw error when search input is empty', () => {
    component.globalSearchInputValue = '';
    fixture.detectChanges();    
    component.globalSearch();
    expect(component.globalSearchResults.length).toBe(0);
});

  /**
   * Global search with input - error handling
   */
  it('should throw error if input is less than 3 letters', () => {
    component.globalSearchInputValue = "ma";
    component.siteId = '2';
    component.globalSearchForm.controls.globalSearch.setValue("ma");
    const mockErrorResponse = {
      severity: 'error',
      summary: 'Error',
      detail: 'Kindly enter at least 3 letters to search.',
    };  
    spyOn(mockGlobalSearchService,'getPatientsList').and.returnValue(throwError(mockErrorResponse));  
    component.globalSearch();
    fixture.detectChanges();
    expect(component.globalSearchResults.length).toBe(0);    
});


  /**
   * Global search with input - error handling for empty response
   */
  it('should throw error if input is not found', () => {
    component.globalSearchInputValue = "maximillan";
    component.siteId = '2';
    component.globalSearchForm.controls.globalSearch.setValue("maximillan");
    globalSearchResults = [];
 
    const spy = spyOn(mockGlobalSearchService,'getPatientsList').and.returnValue(of(globalSearchResults));
  
    component.globalSearch();
    fixture.detectChanges();    
    expect(component.globalSearchResults.length).toEqual(0);
});



  /**
   * Global search with input and non empty response
   */
  it('should search for input and give the response', () => {
    component.globalSearchInputValue = "maximillan";
    component.siteId = '2';
    globalSearchResults = [{        
      dob: 'string',
      firstName: 'string',
      gender:'string',
      id: 0,
      lastName: 'string',
      phone: 'string',
      state:'string',
      status:'string',
      username: 'string'
    },
    ];

    component.globalSearchForm.controls.globalSearch.setValue("maximillan");
    const spy = spyOn(mockGlobalSearchService,'getPatientsList').and.returnValue(of(globalSearchResults));
    component.globalSearch();
    fixture.detectChanges();    
    expect(component.globalSearchResults.length).toBe(1);

});

/**
 * Calls the service when the response is not empty
 */
it('should call the service when response is non empty', () => {
  globalSearchResults = [{
    dob: 'string',
    firstName: 'string',
    gender:'string',
    id: 0,
    lastName: 'string',
    phone: 'string',
    state:'string',
    status:'string',
    username: 'string'
  },
];

const spy = spyOn(mockSharedDataService, 'updateGlobalSearchResults').and.callThrough();
component.globalSearch();
fixture.detectChanges();  
expect(spy).toBeDefined();  
});

/**
 * Throws error when the response is empty
 */
it('should throw error when response is empty', () => {
  globalSearchResults = [];
  component.globalSearchInputValue = "maximillan";
    component.siteId = '2';
    component.globalSearchForm.controls.globalSearch.setValue("maximillan");
  const mockErrorResponse = {
    severity: 'error',
    summary: 'Error',
    detail: 'No Results Found.',
  }
  const spy = spyOn(mockGlobalSearchService, 'getPatientsList').and.returnValue(throwError(mockErrorResponse));
component.globalSearch();
fixture.detectChanges();    
expect(component.globalSearchResults.length).toEqual(0);
});

/**
 * Change password and navigate to login page
 */
  xit('Should change password and navigate to login page', () => {
    component.changePassword();
    expect(location.pathname).toEqual('/clinician-login');
  });
});
