import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppModule } from '../app.module';
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    const currentUser = {
        exp: 1623500150,
        iat: 1623494750,
        jti: '6c159de4-e535-4458-bfeb-ff03c138e7ff',
        iss: 'http://40.76.41.172:8080/auth/realms/PainScriptApp',
        aud: 'account',
        sub: 'f:7bcb909f-fde2-433f-acb9-2b0bcb68ff2f:2',
        typ: 'Bearer',
        azp: 'painscript-site-app',
        session_state: '5a92a39e-3f21-48fd-98fe-625ae100ab85',
        acr: '1',
        realm_access: { roles: ['Clinicians'] },
        resource_access: {
            account: {
                roles: ['manage-account', 'manage-account-links', 'view-profile']
            }
        },
        scope: 'openid profile email',
        email_verified: false,
        name: 'Michael Jones',
        preferred_username: 'siteclinician@gmail.com',
        given_name: 'Michael',
        family_name: 'Jones'
    };
    const headerObject = {
        deviceType: null,
        amount: 50,
        publishable_key:
            'pk_test_51Iq4kPEBhk0cpGnK1sKiz5txYd8TCC0tDSUvohBMpBIaML4fV60G9JiswOJos4v06znx4N9Hc0km9kNxeKD7FdEp00mPfCcni3',
        siteName: 'Eden Medical Center',
        token_type: 'Bearer',
        userName: 'siteclinician@gmail.com',
        userId: 2,
        deviceId: null,
        client_id: 'painscript-site-app',
        deviceToken: null,
        access_token:
            'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5MGgxVF9zQUFrSUhKT2pFQkNFUS1JdmRrWGZUWDhHbkc1TVZsb0dZVEhJIn0.eyJleHAiOjE2MjM1MDAxNTAsImlhdCI6MTYyMzQ5NDc1MCwianRpIjoiNmMxNTlkZTQtZTUzNS00NDU4LWJmZWItZmYwM2MxMzhlN2ZmIiwiaXNzIjoiaHR0cDovLzQwLjc2LjQxLjE3Mjo4MDgwL2F1dGgvcmVhbG1zL1BhaW5TY3JpcHRBcHAiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjo3YmNiOTA5Zi1mZGUyLTQzM2YtYWNiOS0yYjBiY2I2OGZmMmY6MiIsInR5cCI6IkJlYXJlciIsImF6cCI6InBhaW5zY3JpcHQtc2l0ZS1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiNWE5MmEzOWUtM2YyMS00OGZkLTk4ZmUtNjI1YWUxMDBhYjg1IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJTaXRlQWRtaW5zIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbWVzIFNtaXRoIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2l0ZWFkbWluQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJKYW1lcyIsImZhbWlseV9uYW1lIjoiU21pdGgifQ.qFaKNzqsNyiSMiEHpqZxTZFHPDIG_jJdbfVKdJ4zuXOOG4te5CePinYL4zFYdOToDz4iFU5tly_Vl3qMWAF--Wlz4tifI9HS8D6vOMJ3Cgsi4iaGw8zi-Lg7NW6Z8ortTMRW_nD_GuWXb_aWuyR6ObgrN8jQotP7CYoHaqpVs2YOdw9aFPp1HTQQnw_f4YnXKxKi6dOLdNmjzFIYcqkx0sEzaveGWNYjFhY5nxK9SGJPhdGTV8mmIAf2-415CEoDNYvVFiP81j_Yo0QWqtH-e-wRMSCwrVSqLoTjo51xuI3RKY9L9MtoMfOTQtdqEnE9SDB0PXrha2joDyXlqKQaYg',
        refresh_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0MjdjOGI0MS05YzQ5LTQ0NzctYmI2NS1jODM5YjU3MzQ0M2QifQ.eyJleHAiOjE2MjM1MTk5NTAsImlhdCI6MTYyMzQ5NDc1MCwianRpIjoiZjdjZTk3YWUtYWExMi00ZWFiLTgyNDAtZDc4ZjQ0NjdmOWY3IiwiaXNzIjoiaHR0cDovLzQwLjc2LjQxLjE3Mjo4MDgwL2F1dGgvcmVhbG1zL1BhaW5TY3JpcHRBcHAiLCJhdWQiOiJodHRwOi8vNDAuNzYuNDEuMTcyOjgwODAvYXV0aC9yZWFsbXMvUGFpblNjcmlwdEFwcCIsInN1YiI6ImY6N2JjYjkwOWYtZmRlMi00MzNmLWFjYjktMmIwYmNiNjhmZjJmOjIiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoicGFpbnNjcmlwdC1zaXRlLWFwcCIsInNlc3Npb25fc3RhdGUiOiI1YTkyYTM5ZS0zZjIxLTQ4ZmQtOThmZS02MjVhZTEwMGFiODUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.0epx1L6zDC2jNdPplLWN7pskAqs8BqGrZCpSg_6OeUM',
        firstName: 'Michael',
        refresh_expires_in: 25200,
        'not-before-policy': 0,
        scope: 'openid profile email',
        siteId: 1,
        state: 'CA',
        session_state: '5a92a39e-3f21-48fd-98fe-625ae100ab85',
        userRole: 'Clinicians',
        lastLoggedInTime: '2021-06-11T06:51:04.000+00:00',
        expires_in: 5400,
        status: 'PaymentPending'
    };
    const mockAuthenticationService = {
        currentUserValue: currentUser
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: mockAuthenticationService
                }
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});

describe('AuthGuard when the user is not logged in', () => {
    let guard: AuthGuard;
    const mockAuthenticationService = {
        currentUserValue: undefined
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: mockAuthenticationService
                }
            ]
        });
        guard = TestBed.inject(AuthGuard);
        localStorage.clear();
    });

    //should create
    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    //should check authorisation
    it('should redirect to login page if not authorised', () => {
        let route: any = {};
        let state: any = [];
        expect(guard.canActivate(route, state)).toBeFalsy();
    });
});
