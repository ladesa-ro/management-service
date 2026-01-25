import { Module } from "@nestjs/common";
import { DiaCalendarioController } from "@/v2/adapters/in/http/dia-calendario/dia-calendario.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiaCalendarioService } from "@/v2/core/dia-calendario/application/use-cases/dia-calendario.service";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";

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
