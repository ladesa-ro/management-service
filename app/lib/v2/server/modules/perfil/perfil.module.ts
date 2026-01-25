import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { PerfilTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";
import { CampusModule } from "@/v2/server/modules/campus";
import { UsuarioModule } from "@/v2/server/modules/usuario";
import { PerfilController } from "./http";

/**
 * Módulo NestJS para Perfil
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    PerfilService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IPerfilRepositoryPort",
      useClass: PerfilTypeOrmRepositoryAdapter,
    },
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
