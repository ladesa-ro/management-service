import { Module } from "@nestjs/common";
import { PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT } from "@/core/professor-indisponibilidade/application/ports";
import { ProfessorIndisponibilidadeService } from "@/core/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ProfessorIndisponibilidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { TypeormModule } from "@/v2/old/infrastructure";
import { ProfessorIndisponibilidadeLegacyService } from "./professor-indisponibilidade.legacy.service";
import { ProfessorIndisponibilidadeRestController } from "./rest/professor-indisponibilidade.rest.controller";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ProfessorIndisponibilidadeService,
    ProfessorIndisponibilidadeLegacyService,
    {
      provide: PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
      useClass: ProfessorIndisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ProfessorIndisponibilidadeService, ProfessorIndisponibilidadeLegacyService],
})
export class ProfessorIndisponibilidadeModule {}
