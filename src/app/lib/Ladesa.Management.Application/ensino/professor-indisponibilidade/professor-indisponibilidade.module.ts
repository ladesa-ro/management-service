import { Module } from "@nestjs/common";
import { PerfilModule } from "@/Ladesa.Management.Application/acesso/perfil/perfil.module";
import { IProfessorIndisponibilidadeRepository } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/ports";
import { ProfessorIndisponibilidadeService } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import { ProfessorIndisponibilidadeAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/infrastructure";
import { ProfessorIndisponibilidadeTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/infrastructure/persistence/typeorm";
import {
  NestJsPaginateAdapter,
  TypeormModule,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { ProfessorIndisponibilidadeGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/ProfessorIndisponibilidadeGraphqlResolver";
import { ProfessorIndisponibilidadeRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/ProfessorIndisponibilidadeRestController";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ProfessorIndisponibilidadeService,
    ProfessorIndisponibilidadeAuthzRegistrySetup,
    ProfessorIndisponibilidadeGraphqlResolver,
    {
      provide: IProfessorIndisponibilidadeRepository,
      useClass: ProfessorIndisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
