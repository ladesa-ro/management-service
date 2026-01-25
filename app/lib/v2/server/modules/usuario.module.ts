import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/infrastructure/integrations/identity-provider";
import { UsuarioController } from "@/v2/adapters/in/http/usuario/usuario.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { UsuarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ArquivoModule } from "@/v2/core/arquivo/arquivo.module";
import { ImagemModule } from "@/v2/core/imagem/imagem.module";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";

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
      provide: "IUsuarioRepositoryPort",
      useClass: UsuarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
