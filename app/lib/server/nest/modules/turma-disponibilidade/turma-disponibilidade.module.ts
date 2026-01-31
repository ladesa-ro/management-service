import { Module } from "@nestjs/common";
import {
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
  TurmaDisponibilidadeService,
} from "@/core/turma-disponibilidade";
import { DisponibilidadeModule } from "@/server/nest/modules/disponibilidade";
import { TurmaModule } from "@/server/nest/modules/turma";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
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
