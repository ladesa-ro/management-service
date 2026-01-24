import { INestApplication } from "@nestjs/common";
import compression from "compression";

export const useCompression = (app: INestApplication) => {
  app.use(compression());
}