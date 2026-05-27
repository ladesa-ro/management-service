import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import {
  EmpresaCreateCommandHandlerImpl,
  EmpresaDeleteCommandHandlerImpl,
  EmpresaUpdateCommandHandlerImpl,
  EmpresaUpdateFotoEmpresaCommandHandlerImpl,
} from "@/modules/estagio/empresa/application/commands";
import {
  EmpresaFindOneQueryHandlerImpl,
  EmpresaGetFotoEmpresaQueryHandlerImpl,
  EmpresaListQueryHandlerImpl,
} from "@/modules/estagio/empresa/application/queries";
import {
  IEmpresaCreateCommandHandler,
  IEmpresaDeleteCommandHandler,
  IEmpresaUpdateCommandHandler,
  IEmpresaUpdateFotoEmpresaCommandHandler,
} from "@/modules/estagio/empresa/domain/commands";
import {
  IEmpresaFindOneQueryHandler,
  IEmpresaGetFotoEmpresaQueryHandler,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries";
import { IEmpresaRepository } from "@/modules/estagio/empresa/domain/repositories";
import { EmpresaTypeOrmRepositoryAdapter } from "@/modules/estagio/empresa/infrastructure.database";
import { EmpresaRestController } from "@/modules/estagio/empresa/presentation.rest/empresa.rest.controller";
import { EmpresaGraphqlResolver } from "./presentation.graphql";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [EmpresaRestController],
  providers: [
    NestJsPaginateAdapter,
    EmpresaGraphqlResolver,
    {
      provide: IEmpresaRepository,
      useClass: EmpresaTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEmpresaCreateCommandHandler, useClass: EmpresaCreateCommandHandlerImpl },
    { provide: IEmpresaUpdateCommandHandler, useClass: EmpresaUpdateCommandHandlerImpl },
    { provide: IEmpresaDeleteCommandHandler, useClass: EmpresaDeleteCommandHandlerImpl },
    {
      provide: IEmpresaUpdateFotoEmpresaCommandHandler,
      useClass: EmpresaUpdateFotoEmpresaCommandHandlerImpl,
    },
    // Queries
    { provide: IEmpresaListQueryHandler, useClass: EmpresaListQueryHandlerImpl },
    { provide: IEmpresaFindOneQueryHandler, useClass: EmpresaFindOneQueryHandlerImpl },
    {
      provide: IEmpresaGetFotoEmpresaQueryHandler,
      useClass: EmpresaGetFotoEmpresaQueryHandlerImpl,
    },
  ],
  exports: [IEmpresaFindOneQueryHandler],
})
export class EmpresaModule {}
