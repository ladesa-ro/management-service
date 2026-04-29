import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { EmpresaModule } from "@/modules/estagio/empresa/empresa.module";
import { EnderecoModule } from "@/modules/localidades/endereco/endereco.module";
import {
  EstagiarioCreateCommandHandlerImpl,
  EstagiarioDeleteCommandHandlerImpl,
  EstagiarioUpdateCommandHandlerImpl,
} from "@/modules/estagio/estagiario/application/commands";
import {
  EstagiarioFindOneQueryHandlerImpl,
  EstagiarioListQueryHandlerImpl,
} from "@/modules/estagio/estagiario/application/queries";
import {
  IEstagiarioCreateCommandHandler,
  IEstagiarioDeleteCommandHandler,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  IEstagiarioFindOneQueryHandler,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeOrmRepositoryAdapter } from "@/modules/estagio/estagiario/infrastructure.database";
import { EstagiarioGraphqlResolver } from "@/modules/estagio/estagiario/presentation.graphql";
import { EstagiarioRestController } from "@/modules/estagio/estagiario/presentation.rest/estagiario.rest.controller";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";

@Module({
  imports: [UsuarioModule, CursoModule, TurmaModule, EmpresaModule, EnderecoModule, CampusModule, OfertaFormacaoModule],
  controllers: [EstagiarioRestController],
  providers: [
    NestJsPaginateAdapter,
    EstagiarioGraphqlResolver,
    {
      provide: IEstagiarioRepository,
      useClass: EstagiarioTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEstagiarioCreateCommandHandler, useClass: EstagiarioCreateCommandHandlerImpl },
    { provide: IEstagiarioUpdateCommandHandler, useClass: EstagiarioUpdateCommandHandlerImpl },
    { provide: IEstagiarioDeleteCommandHandler, useClass: EstagiarioDeleteCommandHandlerImpl },
    // Queries
    { provide: IEstagiarioListQueryHandler, useClass: EstagiarioListQueryHandlerImpl },
    { provide: IEstagiarioFindOneQueryHandler, useClass: EstagiarioFindOneQueryHandlerImpl },
  ],
  exports: [IEstagiarioFindOneQueryHandler],
})
export class EstagiarioModule {}
