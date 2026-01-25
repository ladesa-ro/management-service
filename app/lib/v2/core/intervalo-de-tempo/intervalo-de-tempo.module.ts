import { Global, Module } from "@nestjs/common";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";

@Global()
@Module({
  imports: [],
  providers: [IntervaloDeTempoService],
  exports: [IntervaloDeTempoService],
  controllers: [],
})
export class IntervaloDeTempoModule {}
