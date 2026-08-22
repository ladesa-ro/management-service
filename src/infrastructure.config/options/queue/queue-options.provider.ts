import { Logger, Provider } from "@nestjs/common";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";
import type { IQueueOptions } from "./queue-options.interface";
import { IQueueOptions as IQueueOptionsToken } from "./queue-options.interface";

export const QueueOptionsProvider: Provider = {
  provide: IQueueOptionsToken,
  useFactory: (configService: IConfigService): IQueueOptions | null => {
    const url = configService.get<string>(ConfigTokens.QueueOptions.Url);

    if (!url) {
      Logger.warn(
        "QUEUE_DATABASE_URL not configured. Queue features will be unavailable.",
        "AppConfig",
      );
      return null;
    }

    return {
      url,
      schema: configService.get<string>(ConfigTokens.QueueOptions.Schema) ?? "bullmq",
      queueTimetableGenerate:
        configService.get<string>(ConfigTokens.QueueOptions.QueueTimetableGenerate) ??
        "timetable-generate",
      queueFolhaPontoWhatsapp:
        configService.get<string>(ConfigTokens.QueueOptions.QueueFolhaPontoWhatsapp) ??
        "folha-ponto-notificacao-whatsapp",
    };
  },
  inject: [IConfigServiceToken],
};
