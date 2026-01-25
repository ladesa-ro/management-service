import { Global, Module } from "@nestjs/common";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { IntervaloDeTempoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";

/**
 * Módulo IntervaloTempo configurado com Arquitetura Hexagonal
 * - IntervaloDeTempoService: Implementa casos de uso (porta de entrada)
 * - IntervaloDeTempoTypeOrmRepositoryAdapter: Implementa IIntervaloDeTempoRepositoryPort (porta de saída)
 */
@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: "IIntervaloDeTempoRepositoryPort",
      useClass: IntervaloDeTempoTypeOrmRepositoryAdapter,
    },
    IntervaloDeTempoService,
  ],
  exports: [IntervaloDeTempoService],
  controllers: [],
})
export class IntervaloDeTempoModule {}
