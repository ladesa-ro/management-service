import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { IRuntimeOptions } from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { correlationIdMiddleware } from "@/infrastructure.logging";
import { AppModule } from "@/server/nest/app.module";
import { useCompression } from "@/server/plugins/use-compression";
import { useCors } from "@/server/plugins/use-cors";
import { useDocs } from "@/server/plugins/use-docs";
import { useHelmet } from "@/server/plugins/use-helmet";
import { usePrefix } from "@/server/plugins/use-prefix";
import { useValidationPipe } from "@/server/plugins/use-validation-pipe";

export async function setupServer() {
  const app = await NestFactory.create(AppModule);

  app.use(correlationIdMiddleware);
  usePrefix(app);
  useValidationPipe(app);
  useDocs(app);
  useHelmet(app);
  useCors(app);
  useCompression(app);

  const runtimeOptions = app.get<IRuntimeOptions>(IRuntimeOptions);
  const port = runtimeOptions.port;

  await app.listen(port);
}
