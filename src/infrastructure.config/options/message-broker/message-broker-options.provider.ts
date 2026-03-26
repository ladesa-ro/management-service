import { Logger, Provider } from "@nestjs/common";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";
import type { IMessageBrokerOptions } from "./message-broker-options.interface";
import { IMessageBrokerOptions as IMessageBrokerOptionsToken } from "./message-broker-options.interface";

export const MessageBrokerOptionsProvider: Provider = {
  provide: IMessageBrokerOptionsToken,
  useFactory: (configService: IConfigService): IMessageBrokerOptions | null => {
    const url = configService.get<string>(ConfigTokens.MessageBrokerOptions.Url);

    if (!url) {
      Logger.warn(
        "MESSAGE_BROKER_URL not configured. Message broker features will be unavailable.",
        "AppConfig",
      );
      return null;
    }

    return {
      url,
      queueTimetableRequest:
        configService.get<string>(ConfigTokens.MessageBrokerOptions.QueueTimetableRequest) ??
        "dev.timetable_generate.request",
      queueTimetableResponse:
        configService.get<string>(ConfigTokens.MessageBrokerOptions.QueueTimetableResponse) ??
        "dev.timetable_generate.response",
    };
  },
  inject: [IConfigServiceToken],
};
