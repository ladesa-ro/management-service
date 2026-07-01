import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { IWhatsAppProviderToken } from "@/notifications/interfaces/whatsapp-provider.interface";
import { OpenWAClient } from "./client/openwa.client";
import { OpenWAService } from "./services/openwa.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    AppConfigModule,
  ],
  providers: [
    OpenWAClient,
    {
      provide: IWhatsAppProviderToken,
      useClass: OpenWAService,
    },
  ],
  exports: [IWhatsAppProviderToken],
})
export class OpenWAModule {}
