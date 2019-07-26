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

/**
 * 
 * @param err An error comming from an HTTP error.
 */
export function HTTPErrorHandler(err: any) {
    if (err.hasOwnProperty("Error")) {
        // TODO: Display a modal with an error reason.
        throw err.Error
    } else
        throw err;
}
