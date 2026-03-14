import { Module } from "@nestjs/common";
import {
  NestJsPaginateAdapter,
  TypeormModule,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import { PerfilModule } from "@/modules/acesso/perfil/perfil.module";
import { PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT } from "@/modules/ensino/professor-indisponibilidade/application/ports";
import { ProfessorIndisponibilidadeService } from "@/modules/ensino/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import {
  ProfessorIndisponibilidadeFindOneQueryHandlerImpl,
  ProfessorIndisponibilidadeListQueryHandlerImpl,
} from "@/modules/ensino/professor-indisponibilidade/application/use-cases/queries";
import {
  IProfessorIndisponibilidadeFindOneQueryHandler,
  IProfessorIndisponibilidadeListQueryHandler,
} from "@/modules/ensino/professor-indisponibilidade/domain/queries";
import { ProfessorIndisponibilidadeAuthzRegistrySetup } from "@/modules/ensino/professor-indisponibilidade/infrastructure";
import { ProfessorIndisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/ensino/professor-indisponibilidade/infrastructure/persistence/typeorm";
import { ProfessorIndisponibilidadeGraphqlResolver } from "@/modules/ensino/professor-indisponibilidade/presentation/graphql/professor-indisponibilidade.graphql.resolver";
import { ProfessorIndisponibilidadeRestController } from "@/modules/ensino/professor-indisponibilidade/presentation/rest/professor-indisponibilidade.rest.controller";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ProfessorIndisponibilidadeService,
    ProfessorIndisponibilidadeAuthzRegistrySetup,
    ProfessorIndisponibilidadeGraphqlResolver,
    {
      provide: PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
      useClass: ProfessorIndisponibilidadeTypeOrmRepositoryAdapter,
    },
    // Queries
    {
      provide: IProfessorIndisponibilidadeListQueryHandler,
      useClass: ProfessorIndisponibilidadeListQueryHandlerImpl,
    },
    {
      provide: IProfessorIndisponibilidadeFindOneQueryHandler,
      useClass: ProfessorIndisponibilidadeFindOneQueryHandlerImpl,
    },
  ],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
