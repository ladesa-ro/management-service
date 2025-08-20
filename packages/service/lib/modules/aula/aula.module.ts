import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/modules/ambiente/ambiente.module";
import { AulaController } from "@/modules/aula/api/aula.controller";
import { AulaService } from "@/modules/aula/domain/aula.service";
import { DiarioModule } from "@/modules/diario/diario.module";

@Module({
  imports: [DiarioModule, AmbienteModule],
  controllers: [AulaController],
  providers: [AulaService],
  exports: [AulaService],
})
export class AulaModule {}
