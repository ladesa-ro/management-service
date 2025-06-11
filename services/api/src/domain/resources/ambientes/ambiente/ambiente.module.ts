import { Module } from "@nestjs/common";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteController } from "./ambiente.controller";
import { AmbienteService } from "./ambiente.service";

@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [AmbienteService],
  exports: [AmbienteService],
})
export class AmbienteModule {}
