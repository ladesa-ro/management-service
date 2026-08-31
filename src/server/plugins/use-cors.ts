import { INestApplication } from "@nestjs/common";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";

export const useCors = (app: INestApplication) => {
  let isProduction = process.env.NODE_ENV === "production";
  let publicBaseUrl: string | null = process.env.APP_PUBLIC_BASE_URL ?? null;

  try {
    const runtimeOptions = app.get<IRuntimeOptions>(IRuntimeOptionsToken, { strict: false });
    if (runtimeOptions) {
      isProduction = runtimeOptions.nodeEnv === "production";
      publicBaseUrl = runtimeOptions.appPublicBaseUrl ?? publicBaseUrl;
    }
  } catch {}

  const allowedOrigins: boolean | string | string[] = publicBaseUrl
    ? publicBaseUrl.split(",").map((o) => o.trim())
    : isProduction
      ? false
      : true;

  app.enableCors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Idempotency-Key", "Idempotency-Key"],
    credentials: true,
  });
};
