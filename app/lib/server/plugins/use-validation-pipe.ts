import { BadRequestException, INestApplication, ValidationPipe } from "@nestjs/common";
import type { ValidationError } from "class-validator";

/**
 * Transforma erros do class-validator em BadRequestException
 * com o array de ValidationError original para ser processado pelo filtro.
 */
function createValidationExceptionFactory() {
  return (errors: ValidationError[]) => {
    return new BadRequestException(errors);
  };
}

export const useValidationPipe = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // TODO: temporário
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: createValidationExceptionFactory(),
    }),
  );
};
