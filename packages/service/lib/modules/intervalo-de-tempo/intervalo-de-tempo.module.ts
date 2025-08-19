import { Global, Module } from "@nestjs/common";
import { IntervaloDeTempoService } from "./domain/intervalo-de-tempo.service";

@Global()
@Module({
  imports: [],
  providers: [IntervaloDeTempoService],
  exports: [IntervaloDeTempoService],
  controllers: [],
})
export class IntervaloDeTempoModule {
}
