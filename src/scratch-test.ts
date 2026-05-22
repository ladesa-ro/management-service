import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { SystemAccessContext } from "./src/domain/access-context/system.access-context";
import { IUsuarioRepository } from "./src/modules/acesso/usuario";
import { ICampusListQueryHandler } from "./src/modules/ambientes/campus";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usuarioRepo = app.get(IUsuarioRepository);
  const campusListHandler = app.get(ICampusListQueryHandler);

  const matricula = "2024102020072";
  const user = await usuarioRepo.findByMatricula(matricula);
  console.log("User by matricula:", user);

  if (user) {
    const fullUser = await usuarioRepo.getFindOneQueryResult(new SystemAccessContext(), {
      id: user.id,
    } as any);
    console.log("Full user vinculos:", JSON.stringify(fullUser?.vinculos, null, 2));
  }

  const campuses = await campusListHandler.execute(new SystemAccessContext(), {
    search: "JIPARANA",
    page: 1,
    limit: 20,
  } as any);
  console.log("Campuses:", JSON.stringify(campuses?.data, null, 2));

  await app.close();
}

bootstrap();
