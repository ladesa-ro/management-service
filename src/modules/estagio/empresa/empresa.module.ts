import { Module } from "@nestjs/common";
import {
  EmpresaCreateCommandHandlerImpl,
  EmpresaDeleteCommandHandlerImpl,
  EmpresaUpdateCommandHandlerImpl,
} from "@/modules/estagio/empresa/application/commands";
import {
  EmpresaFindOneQueryHandlerImpl,
  EmpresaListQueryHandlerImpl,
} from "@/modules/estagio/empresa/application/queries";
import {
  IEmpresaCreateCommandHandler,
  IEmpresaDeleteCommandHandler,
  IEmpresaUpdateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands";
import {
  IEmpresaFindOneQueryHandler,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries";
import { IEmpresaRepository } from "@/modules/estagio/empresa/domain/repositories";
import { EmpresaTypeOrmRepositoryAdapter } from "@/modules/estagio/empresa/infrastructure";
import { EmpresaRestController } from "@/modules/estagio/empresa/presentation/rest/empresa.rest.controller";

@Module({
  imports: [],
  controllers: [EmpresaRestController],
  providers: [
    {
      provide: IEmpresaRepository,
      useClass: EmpresaTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEmpresaCreateCommandHandler, useClass: EmpresaCreateCommandHandlerImpl },
    { provide: IEmpresaUpdateCommandHandler, useClass: EmpresaUpdateCommandHandlerImpl },
    { provide: IEmpresaDeleteCommandHandler, useClass: EmpresaDeleteCommandHandlerImpl },
    // Queries
    { provide: IEmpresaListQueryHandler, useClass: EmpresaListQueryHandlerImpl },
    { provide: IEmpresaFindOneQueryHandler, useClass: EmpresaFindOneQueryHandlerImpl },
  ],
  exports: [IEmpresaFindOneQueryHandler],
})
export class EmpresaModule {}
