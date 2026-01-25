import { Module } from "@nestjs/common";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteController } from "@/v2/adapters/in/http/ambiente/ambiente.controller";

@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [AmbienteService],
  exports: [AmbienteService],
})
export class AmbienteModule {}
