import { Module } from "@nestjs/common";
import { OpenWAModule } from "@/integrations/openwa/openwa.module";
import { WhatsappNotificationsController } from "./controllers/whatsapp-notifications.controller";
import { WhatsappNotificationsService } from "./services/whatsapp-notifications.service";

@Module({
  imports: [OpenWAModule],
  controllers: [WhatsappNotificationsController],
  providers: [WhatsappNotificationsService],
})
export class NotificationsModule {}
