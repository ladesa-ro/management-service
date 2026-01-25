import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/v2/core/ambiente/ambiente.module";
import { AulaController } from "@/v2/adapters/in/http/aula/aula.controller";
import { AulaService } from "@/v2/core/aula/application/use-cases/aula.service";
import { DiarioModule } from "@/v2/core/diario/diario.module";

@Module({
  imports: [DiarioModule, AmbienteModule],
  controllers: [AulaController],
  providers: [AulaService],
  exports: [AulaService],
})
export class AulaModule {}
