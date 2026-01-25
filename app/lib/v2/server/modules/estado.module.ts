import { Module } from "@nestjs/common";
import { EstadoController } from "@/v2/adapters/in/http/estado/estado.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EstadoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EstadoService } from "@/v2/core/estado/application/use-cases/estado.service";

/**
 * Módulo NestJS para Estado
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [],
  controllers: [EstadoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    EstadoService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IEstadoRepositoryPort",
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
