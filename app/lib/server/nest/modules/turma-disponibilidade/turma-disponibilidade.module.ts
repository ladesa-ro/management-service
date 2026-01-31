import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
  TurmaDisponibilidadeService,
} from "@/modules/turma-disponibilidade";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/turma-disponibilidade/infrastructure/persistence/typeorm";
import { DisponibilidadeModule } from "@/server/nest/modules/disponibilidade";
import { TurmaModule } from "@/server/nest/modules/turma";
import { TurmaDisponibilidadeRestController } from "./rest";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaDisponibilidadeService,
    {
      provide: TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: TurmaDisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
