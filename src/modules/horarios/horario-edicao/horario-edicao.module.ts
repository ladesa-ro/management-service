import { Module } from "@nestjs/common";
import { HorarioEdicaoRestController } from "@/modules/horarios/horario-edicao/presentation.rest";

@Module({
  controllers: [HorarioEdicaoRestController],
})
export class HorarioEdicaoModule {}
