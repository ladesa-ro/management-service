import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CampusTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { EnderecoModule } from "@/v2/server/modules/endereco";
import { CampusController } from "./http";

/**
 * Módulo NestJS para Campus
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    CampusService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "ICampusRepositoryPort",
      useClass: CampusTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CampusService],
})
export class CampusModule {}
