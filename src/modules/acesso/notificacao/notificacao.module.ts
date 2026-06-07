import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { EstagioAlertaCronService } from "./application/cron/estagio-alerta.cron";
import { EstagioNotificacaoPushService } from "./application/services/estagio-notificacao-push.service";
import { INotificacaoRepository } from "./domain/repositories";
import { NotificacaoTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { NotificacaoRestController } from "./presentation.rest/notificacao.rest.controller";
import { NotificacaoGateway } from "./presentation.websocket/notificacao.gateway";

/**
 * Módulo de Notificações.
 *
 * Expõe:
 *  - REST: listar, contar não lidas, marcar como lida
 *  - WebSocket (Socket.IO): gateway com rooms para push em tempo real
 *  - Cron: alertas diários e semanais de prazo e inconsistências
 */
@Module({
  imports: [
    // Necessário para os @Cron decorators funcionarem
    ScheduleModule.forRoot(),
  ],
  controllers: [NotificacaoRestController],
  providers: [
    // Persistência
    {
      provide: INotificacaoRepository,
      useClass: NotificacaoTypeOrmRepositoryAdapter,
    },
    // WebSocket gateway
    NotificacaoGateway,
    // Serviço de push (usa o gateway)
    EstagioNotificacaoPushService,
    // Cron jobs de alertas
    EstagioAlertaCronService,
  ],
  // Exporta o push service para que o EstagioModule possa injetá-lo
  exports: [EstagioNotificacaoPushService],
})
export class NotificacaoModule {}
