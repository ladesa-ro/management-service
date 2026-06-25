import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { WhatsAppService } from "./whatsapp.service";

@Module({
  imports: [AppConfigModule],
  providers: [WhatsAppService],
  exports: [WhatsAppService],
})
export class WhatsAppModule {}
