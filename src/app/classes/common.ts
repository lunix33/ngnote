import { Injector } from '@angular/core';

export let InjectorInstance: Injector;
export const ApiUrl: string = `${(localStorage.getItem('api')) ? localStorage.getItem('api') : location.origin}`;

/**
 * Initialize an injector.
 * @param injector The created injector.
 */
export function InitInjector(injector: Injector) {
    if (InjectorInstance == null)
        InjectorInstance = injector
}
