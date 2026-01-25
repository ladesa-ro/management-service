import { Module } from "@nestjs/common";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { UsuarioModule } from "@/v2/core/usuario/usuario.module";
import { PerfilController } from "@/v2/adapters/in/http/perfil/perfil.controller";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";
import { PerfilTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Perfil configurado com Arquitetura Hexagonal
 * - PerfilService: Implementa IPerfilUseCasePort (porta de entrada)
 * - PerfilTypeOrmRepositoryAdapter: Implementa IPerfilRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IPerfilRepositoryPort",
      useClass: PerfilTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    PerfilService,
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
