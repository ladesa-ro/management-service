import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AmbientePermissionCheckerImpl } from "@/modules/ambientes/ambiente/application/authorization";
import {
  AmbienteCreateCommandHandlerImpl,
  AmbienteDeleteCommandHandlerImpl,
  AmbienteUpdateCommandHandlerImpl,
  AmbienteUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ambientes/ambiente/application/commands";
import {
  AmbienteFindOneQueryHandlerImpl,
  AmbienteGetImagemCapaQueryHandlerImpl,
  AmbienteListQueryHandlerImpl,
} from "@/modules/ambientes/ambiente/application/queries";
import { IAmbientePermissionChecker } from "@/modules/ambientes/ambiente/domain/authorization";
import {
  IAmbienteCreateCommandHandler,
  IAmbienteDeleteCommandHandler,
  IAmbienteUpdateCommandHandler,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands";
import {
  IAmbienteFindOneQueryHandler,
  IAmbienteGetImagemCapaQueryHandler,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries";
import { IAmbienteRepository } from "@/modules/ambientes/ambiente/domain/repositories";
import {
  AmbienteAuthzRegistrySetup,
  AmbienteTypeOrmRepositoryAdapter,
} from "@/modules/ambientes/ambiente/infrastructure";
import { AmbienteGraphqlResolver } from "@/modules/ambientes/ambiente/presentation/graphql/ambiente.graphql.resolver";
import { AmbienteRestController } from "@/modules/ambientes/ambiente/presentation/rest/ambiente.rest.controller";
import { BlocoModule } from "@/modules/ambientes/bloco/bloco.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";

@Module({
  imports: [BlocoModule, ImagemModule, ArquivoModule],
  controllers: [AmbienteRestController],
  providers: [
    NestJsPaginateAdapter,
    AmbienteGraphqlResolver,
    AmbienteAuthzRegistrySetup,
    { provide: IAmbienteRepository, useClass: AmbienteTypeOrmRepositoryAdapter },
    // Authorization
    { provide: IAmbientePermissionChecker, useClass: AmbientePermissionCheckerImpl },
    // Commands
    { provide: IAmbienteCreateCommandHandler, useClass: AmbienteCreateCommandHandlerImpl },
    { provide: IAmbienteUpdateCommandHandler, useClass: AmbienteUpdateCommandHandlerImpl },
    { provide: IAmbienteDeleteCommandHandler, useClass: AmbienteDeleteCommandHandlerImpl },
    {
      provide: IAmbienteUpdateImagemCapaCommandHandler,
      useClass: AmbienteUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: IAmbienteListQueryHandler, useClass: AmbienteListQueryHandlerImpl },
    { provide: IAmbienteFindOneQueryHandler, useClass: AmbienteFindOneQueryHandlerImpl },
    {
      provide: IAmbienteGetImagemCapaQueryHandler,
      useClass: AmbienteGetImagemCapaQueryHandlerImpl,
    },
  ],
  exports: [IAmbienteFindOneQueryHandler],
})
export class AmbienteModule {}
