import { INestApplication } from "@nestjs/common";
import helmet from "helmet";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";

export const useHelmet = (app: INestApplication) => {
  let isProduction = process.env.NODE_ENV === "production";

  try {
    const runtimeOptions = app.get<IRuntimeOptions>(IRuntimeOptionsToken, { strict: false });
    if (runtimeOptions) {
      isProduction = runtimeOptions.nodeEnv === "production";
    }
  } catch {}

  const scriptSrc = isProduction
    ? ["'self'"]
    : [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://unpkg.com",
        "'unsafe-inline'",
        "'unsafe-eval'",
      ];

  const styleSrc = isProduction
    ? ["'self'", "'unsafe-inline'"]
    : ["'self'", "https://unpkg.com", "'unsafe-inline'"];

  const fontSrc = isProduction
    ? ["'self'", "data:"]
    : ["'self'", "https://unpkg.com", "https://fonts.scalar.com", "data:"];

  const imgSrc = isProduction ? ["'self'", "data:"] : ["'self'", "data:", "https://unpkg.com"];

  const directives = {
    defaultSrc: ["'self'"],
    scriptSrc,
    styleSrc,
    imgSrc,
    fontSrc,
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
        directives,
      },
      crossOriginResourcePolicy: false,
    }),
  );
};
