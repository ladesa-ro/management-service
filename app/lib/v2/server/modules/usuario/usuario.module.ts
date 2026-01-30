import { Module } from "@nestjs/common";
import { USUARIO_REPOSITORY_PORT } from "@/core/usuario/application/ports";
import { UsuarioService } from "@/core/usuario/application/use-cases/usuario.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { UsuarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { KeycloakModule } from "@/v2/old/infrastructure/integrations/identity-provider";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { UsuarioController } from "./http";

/**
 * Módulo NestJS para Usuario
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [KeycloakModule, ImagemModule, ArquivoModule],
  controllers: [UsuarioController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    UsuarioService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: USUARIO_REPOSITORY_PORT,
      useClass: UsuarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
