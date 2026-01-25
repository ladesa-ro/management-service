import { NestFactory } from "@nestjs/core";
import { AppConfigService } from "@/v2/infra/config";
import "reflect-metadata";
import { AppModule } from "@/v2/server/nest/app.module";
import { usePrefix } from "@/v2/server/plugins/use-prefix";
import { useValidationPipe } from "@/v2/server/plugins/use-validation-pipe";
import { useDocs } from "@/v2/server/plugins/use-docs";
import { useHelmet } from "@/v2/server/plugins/use-helmet";
import { useCors } from "@/v2/server/plugins/use-cors";
import { useCompression } from "@/v2/server/plugins/use-compression";

async function main() {
  const app = await NestFactory.create(AppModule);

  usePrefix(app);
  useValidationPipe(app);
  useDocs(app);
  useHelmet(app);
  useCors(app);
  useCompression(app);

  const config = app.get(AppConfigService);
  const port = config.getRuntimePort();

  await app.listen(port);
}

main();
