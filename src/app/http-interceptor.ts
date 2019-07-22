import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthHttpInterceptor } from './class/auth-http-interceptor';

export const httpInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
]