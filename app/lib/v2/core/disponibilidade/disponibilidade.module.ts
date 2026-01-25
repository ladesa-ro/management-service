import { Module } from "@nestjs/common";
import { DisponibilidadeController } from "@/v2/adapters/in/http/disponibilidade/disponibilidade.controller";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/application/use-cases/disponibilidade.service";

@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [DisponibilidadeService],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
