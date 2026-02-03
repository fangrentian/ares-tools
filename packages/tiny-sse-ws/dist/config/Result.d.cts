declare class Result {
    code: number;
    data: any;
    message: string;
    constructor(code: number, data: any, message: string);
    static success(data: any, message?: string): Result;
    static fail(data: any, message?: string): Result;
    static validateFail(data: any, message?: string): Result;
    static notFound(data: any, message?: string): Result;
    static coreFail(data: any, message?: string): Result;
    static noPermission(data: any, message?: string): Result;
    static unauthorized(data: any, message?: string): Result;
}

export { Result };
