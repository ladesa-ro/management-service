import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/features/ambiente/ambiente.module";
import { AulaController } from "@/features/aula/api/aula.controller";
import { AulaService } from "@/features/aula/domain/aula.service";
import { DiarioModule } from "@/features/diario/diario.module";

@Module({
  imports: [DiarioModule, AmbienteModule],
  controllers: [AulaController],
  providers: [AulaService],
  exports: [AulaService],
})
export class AulaModule {}
