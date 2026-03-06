import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  CONFIG_PORT,
  type IConfigPort,
} from "@/Ladesa.Management.Application/@shared/application/ports/out/config";
import { AppModule } from "@/Ladesa.Management.Server.Api/nest/app.module";
import { useCompression } from "@/Ladesa.Management.Server.Api/plugins/use-compression";
import { useCors } from "@/Ladesa.Management.Server.Api/plugins/use-cors";
import { useDocs } from "@/Ladesa.Management.Server.Api/plugins/use-docs";
import { useHelmet } from "@/Ladesa.Management.Server.Api/plugins/use-helmet";
import { usePrefix } from "@/Ladesa.Management.Server.Api/plugins/use-prefix";
import { useValidationPipe } from "@/Ladesa.Management.Server.Api/plugins/use-validation-pipe";

export async function setupServer() {
  const app = await NestFactory.create(AppModule);

  usePrefix(app);
  useValidationPipe(app);
  useDocs(app);
  useHelmet(app);
  useCors(app);
  useCompression(app);

  const config = app.get<IConfigPort>(CONFIG_PORT);
  const port = config.getRuntimePort();

  await app.listen(port);
}
