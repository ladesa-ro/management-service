import { Module } from "@nestjs/common";
import { AmbienteModule } from "../../../ambientes/ambiente";
import { DiarioModule } from "../diario/diario.module";
import { AulaController } from "./aula.controller";
import { AulaService } from "./aula.service";

@Module({
  imports: [DiarioModule, AmbienteModule],
  controllers: [AulaController],
  providers: [AulaService],
  exports: [AulaService],
})
export class AulaModule {}
