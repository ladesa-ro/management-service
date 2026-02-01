import { INestApplication } from "@nestjs/common";
import helmet from "helmet";

export const useHelmet = (app: INestApplication) => {
  const directives = {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "https://cdn.jsdelivr.net",
      "https://unpkg.com",
      "'unsafe-inline'",
      "'unsafe-eval'",
    ],
    styleSrc: ["'self'", "https://unpkg.com", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https://unpkg.com"],
    fontSrc: ["'self'", "https://unpkg.com", "https://fonts.scalar.com", "data:"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameAncestors: ["'self'"],
    workerSrc: ["'self'", "blob:"],
  };

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: directives,
      },
      crossOriginResourcePolicy: false,
    }),
  );
};
