import { Module } from "@nestjs/common";
import { PerfilModule } from "@/modules/@acesso/perfil";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DiarioModule } from "@/modules/ensino/diario";
import { DIARIO_PROFESSOR_REPOSITORY_PORT } from "@/modules/ensino/diario-professor/application/ports";
import { DiarioProfessorService } from "@/modules/ensino/diario-professor/application/use-cases/diario-professor.service";
import { DiarioProfessorAuthzRegistrySetup } from "@/modules/ensino/diario-professor/infrastructure";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/modules/ensino/diario-professor/infrastructure/persistence/typeorm";
import { DiarioProfessorGraphqlResolver } from "@/modules/ensino/diario-professor/presentation/graphql/diario-professor.graphql.resolver";
import { DiarioProfessorController } from "@/modules/ensino/diario-professor/presentation/rest";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: DIARIO_PROFESSOR_REPOSITORY_PORT,
      useClass: DiarioProfessorTypeOrmRepositoryAdapter,
    },
    DiarioProfessorService,
    DiarioProfessorGraphqlResolver,
    DiarioProfessorAuthzRegistrySetup,
  ],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
