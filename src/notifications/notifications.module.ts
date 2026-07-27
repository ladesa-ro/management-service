import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { WahaModule } from "@/integrations/waha/waha.module";
import { WhatsappNotificationsController } from "./controllers/whatsapp-notifications.controller";
import { WhatsappWebhooksController } from "./controllers/whatsapp-webhooks.controller";
import { WhatsappNotificationsService } from "./services/whatsapp-notifications.service";

@Module({
  imports: [WahaModule, AppConfigModule],
  controllers: [WhatsappNotificationsController, WhatsappWebhooksController],
  providers: [WhatsappNotificationsService],
  exports: [WhatsappNotificationsService],
})
export class NotificationsModule {}
