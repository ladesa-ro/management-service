import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import {
  TurmaMatriculaDesvincularCommandHandlerImpl,
  TurmaMatriculaVincularCommandHandlerImpl,
} from "./application/commands";
import { TurmaMatriculaListQueryHandlerImpl } from "./application/queries";
import {
  ITurmaMatriculaDesvincularCommandHandler,
  ITurmaMatriculaVincularCommandHandler,
} from "./domain/commands";
import { ITurmaMatriculaListQueryHandler } from "./domain/queries";
import { ITurmaMatriculaRepository } from "./domain/repositories";
import { TurmaMatriculaTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { TurmaMatriculaRestController } from "./presentation.rest/turma-matricula.rest.controller";

@Module({
  imports: [TurmaModule, UsuarioModule],
  controllers: [TurmaMatriculaRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: ITurmaMatriculaRepository,
      useClass: TurmaMatriculaTypeOrmRepositoryAdapter,
    },

    {
      provide: ITurmaMatriculaVincularCommandHandler,
      useClass: TurmaMatriculaVincularCommandHandlerImpl,
    },
    {
      provide: ITurmaMatriculaDesvincularCommandHandler,
      useClass: TurmaMatriculaDesvincularCommandHandlerImpl,
    },

    {
      provide: ITurmaMatriculaListQueryHandler,
      useClass: TurmaMatriculaListQueryHandlerImpl,
    },
  ],
  exports: [ITurmaMatriculaRepository],
})
export class TurmaMatriculaModule {}
