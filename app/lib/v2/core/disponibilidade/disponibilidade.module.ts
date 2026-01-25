import { Module } from "@nestjs/common";
import { DisponibilidadeController } from "@/v2/adapters/in/http/disponibilidade/disponibilidade.controller";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/application/use-cases/disponibilidade.service";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Disponibilidade configurado com Arquitetura Hexagonal
 * - DisponibilidadeService: Implementa casos de uso (porta de entrada)
 * - DisponibilidadeTypeOrmRepositoryAdapter: Implementa IDisponibilidadeRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDisponibilidadeRepositoryPort",
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },
    DisponibilidadeService,
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
