import { Module } from "@nestjs/common";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteController } from "./api/ambiente.controller";
import { AmbienteService } from "./domain/ambiente.service";

@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [AmbienteService],
  exports: [AmbienteService],
})
export class AmbienteModule {}
