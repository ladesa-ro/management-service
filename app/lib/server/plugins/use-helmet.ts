import { INestApplication } from "@nestjs/common";
import helmet from "helmet";

export const useHelmet = (app: INestApplication) => {
  const enableDirectives = false;

  const directives = {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "https://cdn.jsdelivr.net",
      "https://unpkg.com",
      "'sha256-o7edkv+OgKBSsAFAX2/oZBLyBKkKSwKR4idD6i6+5TM='",
      "'sha256-E55b/hKtDvu9PwyJMvhVIYqzNZi2Li6+ATCTtQCZepQ='",
    ],
    styleSrc: ["'self'", "https://unpkg.com", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https://unpkg.com"],
    fontSrc: ["'self'", "https://unpkg.com", "https://fonts.scalar.com"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameAncestors: ["'self'"],
  };

  app.use(
    helmet({
      contentSecurityPolicy: enableDirectives
        ? {
            useDefaults: true,
            directives: directives,
          }
        : false,
      crossOriginResourcePolicy: enableDirectives ? false : undefined,
    }),
  );
};
