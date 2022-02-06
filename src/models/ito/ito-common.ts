interface CommonBilgi<T> {
    Result: boolean;
    Index: number;
    Size: number;
    Count: number;
    Data?: T[];
    Error?: Error;
}

interface Error {
    HttpStatusCode: number;
    ErrorMessages: string;
}

export {
    CommonBilgi, Error
}