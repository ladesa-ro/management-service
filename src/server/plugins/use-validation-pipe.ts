import type { INestApplication } from "@nestjs/common";
import { ZodGlobalValidationPipe } from "@/shared/validation/zod-global-validation.pipe";

export const useValidationPipe = (app: INestApplication) => {
  app.useGlobalPipes(new ZodGlobalValidationPipe());
};
