import { Module } from "@nestjs/common";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteResolver } from "./ambiente.resolver";
import { AmbienteController } from "./api/ambiente.controller";
import { AmbienteService } from "./domain/ambiente.service";

@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [AmbienteService, AmbienteResolver],
  exports: [AmbienteService],
})
export class AmbienteModule {
}
