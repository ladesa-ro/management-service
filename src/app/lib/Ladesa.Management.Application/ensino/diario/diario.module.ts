import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import { IDiarioRepository } from "@/Ladesa.Management.Application/ensino/diario/application/ports";
import { DiarioService } from "@/Ladesa.Management.Application/ensino/diario/application/use-cases/diario.service";
import { DiarioAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/diario/infrastructure";
import { DiarioTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/diario/infrastructure/persistence/typeorm";
import { DisciplinaModule } from "@/Ladesa.Management.Application/ensino/disciplina/disciplina.module";
import { TurmaModule } from "@/Ladesa.Management.Application/ensino/turma/turma.module";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { DiarioGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/DiarioGraphqlResolver";
import { DiarioRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/DiarioRestController";

/**
 * Modulo NestJS para Diario
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioRestController],
  providers: [
    NestJsPaginateAdapter,
    DiarioService,
    DiarioGraphqlResolver,
    DiarioAuthzRegistrySetup,
    {
      provide: IDiarioRepository,
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DiarioService],
})
export class DiarioModule {}
