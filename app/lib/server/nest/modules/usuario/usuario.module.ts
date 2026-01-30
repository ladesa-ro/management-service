import { Module } from "@nestjs/common";
import { USUARIO_REPOSITORY_PORT } from "@/core/usuario/application/ports";
import { UsuarioService } from "@/core/usuario/application/use-cases/usuario.service";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { UsuarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { KeycloakModule } from "@/v2/old/infrastructure/integrations/identity-provider";
import { UsuarioRestController } from "./rest/usuario.rest.controller";

@Module({
  imports: [KeycloakModule, ImagemModule, ArquivoModule],
  controllers: [UsuarioRestController],
  providers: [
    NestJsPaginateAdapter,
    UsuarioService,
    {
      provide: USUARIO_REPOSITORY_PORT,
      useClass: UsuarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
