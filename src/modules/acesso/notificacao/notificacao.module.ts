import { Module } from "@nestjs/common";
import { NotificacaoRestController } from "./presentation.rest/notificacao.rest.controller";

@Module({
  controllers: [NotificacaoRestController],
  providers: [],
  exports: [],
})
export class NotificacaoModule {}
