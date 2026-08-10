import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { MessageBrokerModule } from "@/infrastructure.message-broker/message-broker.module";
import { WahaModule } from "@/integrations/waha/waha.module";
import { NotificacaoModule } from "@/modules/acesso/notificacao/notificacao.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import { EstagioModule } from "@/modules/estagio/estagio/estagio.module";
import { NotificationsModule } from "@/notifications/notifications.module";
// Application Handlers
import {
  FolhaPontoCancelCommandHandlerImpl,
  FolhaPontoCreateCommandHandlerImpl,
  FolhaPontoTokenConfirmHandler,
} from "./application/commands";
import { FolhaPontoNotificacaoConsumer } from "./application/consumers";
import { FolhaPontoExpiracaoJob } from "./application/jobs";
import {
  FolhaPontoFindOneQueryHandlerImpl,
  FolhaPontoListQueryHandlerImpl,
} from "./application/queries";
// Services, Jobs, Consumers
import { FolhaPontoLinkService, FolhaPontoWhatsappService } from "./application/services";
// Domain Ports
import {
  IFolhaPontoCancelCommandHandler,
  IFolhaPontoCreateCommandHandler,
} from "./domain/commands";
import { IFolhaPontoFindOneQueryHandler, IFolhaPontoListQueryHandler } from "./domain/queries";
import { IFolhaPontoRepository, IFolhaPontoTokenRepository } from "./domain/repositories";
// Infrastructure Adapters
import {
  FolhaPontoTokenTypeOrmRepositoryAdapter,
  FolhaPontoTypeOrmRepositoryAdapter,
} from "./infrastructure.database";
// Resolvers & Controllers
import { FolhaPontoGraphqlResolver } from "./presentation.graphql";
import { FolhaPontoRestController, FolhaPontoTokenRestController } from "./presentation.rest";

@Module({
  imports: [
    EstagioModule, // acesso ao IEstagioRepository
    EstagiarioModule, // acesso ao IEstagiarioRepository
    NotificacaoModule, // WebSocket push (se necessário no futuro)
    WahaModule, // IWhatsAppProvider (se usado diretamente)
    NotificationsModule, // WhatsappNotificationsService
    MessageBrokerModule, // MessageBrokerContainerService
  ],
  controllers: [FolhaPontoTokenRestController, FolhaPontoRestController],
  providers: [
    NestJsPaginateAdapter,

    // Presentation
    FolhaPontoGraphqlResolver,

    // Background / Jobs
    FolhaPontoExpiracaoJob,
    FolhaPontoNotificacaoConsumer,

    // Services / Utils
    FolhaPontoLinkService,
    FolhaPontoWhatsappService,

    // Command Handlers (sem DI port)
    FolhaPontoTokenConfirmHandler,

    // Dependency Injection Bindings
    { provide: IFolhaPontoRepository, useClass: FolhaPontoTypeOrmRepositoryAdapter },
    { provide: IFolhaPontoTokenRepository, useClass: FolhaPontoTokenTypeOrmRepositoryAdapter },

    { provide: IFolhaPontoCreateCommandHandler, useClass: FolhaPontoCreateCommandHandlerImpl },
    { provide: IFolhaPontoCancelCommandHandler, useClass: FolhaPontoCancelCommandHandlerImpl },

    { provide: IFolhaPontoListQueryHandler, useClass: FolhaPontoListQueryHandlerImpl },
    { provide: IFolhaPontoFindOneQueryHandler, useClass: FolhaPontoFindOneQueryHandlerImpl },
  ],
  exports: [IFolhaPontoRepository], // Exporta o port caso outros módulos precisem
})
export class FolhaPontoModule {}
