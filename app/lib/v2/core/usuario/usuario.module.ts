import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/infrastructure/integrations/identity-provider";
import { UsuarioController } from "@/v2/adapters/in/http/usuario/usuario.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { UsuarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";

/**
 * Módulo Usuario configurado com Arquitetura Hexagonal
 * - UsuarioService: Implementa casos de uso (porta de entrada)
 * - UsuarioTypeOrmRepositoryAdapter: Implementa IUsuarioRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IUsuarioRepositoryPort",
      useClass: UsuarioTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    UsuarioService,
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
