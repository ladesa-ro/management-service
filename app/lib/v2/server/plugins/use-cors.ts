import { INestApplication } from "@nestjs/common";

export const useCors = (app: INestApplication) => {
  app.enableCors();
}