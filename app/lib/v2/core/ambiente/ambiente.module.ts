import { Module } from "@nestjs/common";
import { AmbienteService } from "@/v2/core/ambiente/domain/ambiente.service";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteController } from "./api/ambiente.controller";

@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [AmbienteService],
  exports: [AmbienteService],
})
export class AmbienteModule {}
