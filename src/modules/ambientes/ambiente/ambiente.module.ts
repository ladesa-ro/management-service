import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AMBIENTE_REPOSITORY_PORT } from "@/modules/ambientes/ambiente/application/ports";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  AmbienteCreateCommandHandlerImpl,
  AmbienteDeleteCommandHandlerImpl,
  AmbienteUpdateCommandHandlerImpl,
  AmbienteUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ambientes/ambiente/application/use-cases/commands";
import {
  AmbienteFindOneQueryHandlerImpl,
  AmbienteGetImagemCapaQueryHandlerImpl,
  AmbienteListQueryHandlerImpl,
} from "@/modules/ambientes/ambiente/application/use-cases/queries";
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
    AmbienteService,
    AmbienteGraphqlResolver,
    AmbienteAuthzRegistrySetup,
    { provide: AMBIENTE_REPOSITORY_PORT, useClass: AmbienteTypeOrmRepositoryAdapter },
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
  exports: [AmbienteService],
})
export class AmbienteModule {}
