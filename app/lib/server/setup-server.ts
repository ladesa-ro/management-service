import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { CONFIG_PORT, type IConfigPort } from "@/core/@shared/application/ports/out/config";
import { AppModule } from "@/server/nest/app.module";
import { useCompression } from "@/server/plugins/use-compression";
import { useCors } from "@/server/plugins/use-cors";
import { useDocs } from "@/server/plugins/use-docs";
import { useExceptionFilters } from "@/server/plugins/use-exception-filters";
import { useHelmet } from "@/server/plugins/use-helmet";
import { usePrefix } from "@/server/plugins/use-prefix";
import { useValidationPipe } from "@/server/plugins/use-validation-pipe";

export async function setupServer() {
  const app = await NestFactory.create(AppModule);

  usePrefix(app);
  useExceptionFilters(app);
  useValidationPipe(app);
  useDocs(app);
  useHelmet(app);
  useCors(app);
  useCompression(app);

  const config = app.get<IConfigPort>(CONFIG_PORT);
  const port = config.getRuntimePort();

  await app.listen(port);
}
