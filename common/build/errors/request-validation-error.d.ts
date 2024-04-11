import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export declare class RequestValidationError extends CustomError {
    errros: ValidationError[];
    statusCode: number;
    constructor(errros: ValidationError[]);
    serializeErrors(): {
        message: any;
        field: string;
    }[];
}
