export interface HTTPStatus {
    Status: HttpStatusCode;
    Message: any;
    Error: any;
}

export interface HTTPStatusResponseError {
    message?: string;
    stack?: string;
    friendly: string;
}

export enum HttpStatusCode {
    Ok = 'ok',
    NotFound = 'not_found',
    Error = 'error'
}