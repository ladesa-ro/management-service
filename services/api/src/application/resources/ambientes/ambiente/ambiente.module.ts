import { Module } from "@nestjs/common";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteController } from "./ambiente.controller";
import { AmbienteResolver } from "./ambiente.resolver";
import { AmbienteService } from "./ambiente.service";

@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [AmbienteService, AmbienteResolver],
  exports: [AmbienteService],
})
export class AmbienteModule {}
