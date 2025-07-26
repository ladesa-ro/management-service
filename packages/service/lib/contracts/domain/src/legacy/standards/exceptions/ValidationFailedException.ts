import { UnprocessableEntityException } from "@nestjs/common";

export type IValidationFailedExceptionResponse = {
  statusCode: number;
  code: string;
  message: string;
  errors: any[];
  timestamp: string;
};

export class ValidationFailedException extends UnprocessableEntityException {
  constructor(errors: any) {
    const response: IValidationFailedExceptionResponse = {
      statusCode: 422,
      errors: errors,
      code: "validation-failed",
      message: "Validation failed",
      timestamp: new Date().toISOString(),
    };

    super(response);
  }
}
