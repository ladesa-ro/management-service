import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { DiaCalendarioController } from "@/v2/adapters/in/http/dia-calendario/dia-calendario.controller";
import { DiaCalendarioService } from "@/v2/core/dia-calendario/application/use-cases/dia-calendario.service";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo DiaCalendario configurado com Arquitetura Hexagonal
 * - DiaCalendarioService: Implementa casos de uso (porta de entrada)
 * - DiaCalendarioTypeOrmRepositoryAdapter: Implementa IDiaCalendarioRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDiaCalendarioRepositoryPort",
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioService,
  ],
  controllers: [DiaCalendarioController],
})
export class DiaCalendarioModule {}
