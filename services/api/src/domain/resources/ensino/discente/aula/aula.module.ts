import { Module } from "@nestjs/common";
import { AmbienteModule } from "../../../ambientes/ambiente";
import { DiarioModule } from "../diario/diario.module";
import { AulaController } from "./aula.controller";
import { AulaResolver } from "./aula.resolver";
import { AulaService } from "./aula.service";

@Module({
  imports: [DiarioModule, AmbienteModule],
  controllers: [AulaController],
  providers: [AulaService, AulaResolver],
  exports: [AulaService],
})
export class AulaModule {}
