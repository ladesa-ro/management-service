import { Module } from "@nestjs/common";
import { PerfilModule } from "@/Ladesa.Management.Application/acesso/perfil/perfil.module";
import { DiarioModule } from "@/Ladesa.Management.Application/ensino/diario/diario.module";
import { DIARIO_PROFESSOR_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/diario-professor/application/ports";
import { DiarioProfessorService } from "@/Ladesa.Management.Application/ensino/diario-professor/application/use-cases/diario-professor.service";
import { DiarioProfessorAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/diario-professor/infrastructure";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/diario-professor/infrastructure/persistence/typeorm";
import { DiarioProfessorGraphqlResolver } from "@/Ladesa.Management.Application/ensino/diario-professor/presentation/graphql/diario-professor.graphql.resolver";
import { DiarioProfessorController } from "@/Ladesa.Management.Application/ensino/diario-professor/presentation/rest";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
