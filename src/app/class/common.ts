import { Injector } from '@angular/core';

export let InjectorInstance: Injector;
export const ApiUrl: string = `${(localStorage.getItem('api')) ? localStorage.getItem('api') : location.origin}/api`;

export function InitInjector(injector: Injector) {
    if (InjectorInstance == null)
        InjectorInstance = injector
}
