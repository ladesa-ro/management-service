import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { IWhatsAppProviderToken } from "@/notifications/interfaces/whatsapp-provider.interface";
import { WahaClient } from "./client/waha.client";
import { WahaService } from "./services/waha.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    AppConfigModule,
  ],
  providers: [
    WahaClient,
    {
      provide: IWhatsAppProviderToken,
      useClass: WahaService,
    },
  ],
  exports: [IWhatsAppProviderToken],
})
export class WahaModule {}
