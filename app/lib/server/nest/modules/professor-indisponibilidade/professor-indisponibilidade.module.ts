import { Module } from "@nestjs/common";
import {
  NestJsPaginateAdapter,
  TypeormModule,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import { PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT } from "@/modules/professor-indisponibilidade/application/ports";
import { ProfessorIndisponibilidadeService } from "@/modules/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import { ProfessorIndisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/professor-indisponibilidade/infrastructure/persistence/typeorm";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { ProfessorIndisponibilidadeGraphqlResolver } from "./graphql/professor-indisponibilidade.graphql.resolver";
import { ProfessorIndisponibilidadeLegacyService } from "./professor-indisponibilidade.legacy.service";
import { ProfessorIndisponibilidadeRestController } from "./rest/professor-indisponibilidade.rest.controller";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ProfessorIndisponibilidadeService,
    ProfessorIndisponibilidadeLegacyService,
    ProfessorIndisponibilidadeGraphqlResolver,
    {
      provide: PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
      useClass: ProfessorIndisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ProfessorIndisponibilidadeService, ProfessorIndisponibilidadeLegacyService],
})
export class ProfessorIndisponibilidadeModule {}
