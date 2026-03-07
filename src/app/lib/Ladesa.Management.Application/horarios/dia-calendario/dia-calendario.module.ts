import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import { DIA_CALENDARIO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/horarios/dia-calendario/application/ports";
import { DiaCalendarioService } from "@/Ladesa.Management.Application/horarios/dia-calendario/application/use-cases/dia-calendario.service";
import { DiaCalendarioAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/dia-calendario/infrastructure";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/dia-calendario/infrastructure/persistence/typeorm";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { DiaCalendarioGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/DiaCalendarioGraphqlResolver";
import { DiaCalendarioRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/DiaCalendarioRestController";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: DIA_CALENDARIO_REPOSITORY_PORT,
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioService,
    DiaCalendarioGraphqlResolver,
    DiaCalendarioAuthzRegistrySetup,
  ],
  controllers: [DiaCalendarioRestController],
  exports: [DiaCalendarioService],
})
export class DiaCalendarioModule {}
