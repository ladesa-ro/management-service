import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { OpenWAModule } from "@/integrations/openwa/openwa.module";
import { WhatsappNotificationsController } from "./controllers/whatsapp-notifications.controller";
import { WhatsappWebhooksController } from "./controllers/whatsapp-webhooks.controller";
import { WhatsappNotificationsService } from "./services/whatsapp-notifications.service";

@Module({
  imports: [OpenWAModule, AppConfigModule],
  controllers: [WhatsappNotificationsController, WhatsappWebhooksController],
  providers: [WhatsappNotificationsService],
})
export class NotificationsModule {}
