import { Module } from "@nestjs/common";
import { INotificacaoRepository } from "./domain/repositories";
import { NotificacaoTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { NotificacaoRestController } from "./presentation.rest/notificacao.rest.controller";

@Module({
  controllers: [NotificacaoRestController],
  providers: [
    {
      provide: INotificacaoRepository,
      useClass: NotificacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [],
})
export class NotificacaoModule {}
