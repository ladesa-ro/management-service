import { Provider } from "@nestjs/common";
import type { IMessageBrokerOptions } from "./message-broker-options.interface";
import { IMessageBrokerOptions as IMessageBrokerOptionsToken } from "./message-broker-options.interface";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";

export const MessageBrokerOptionsProvider: Provider = {
  provide: IMessageBrokerOptionsToken,
  useFactory: (configService: IConfigService): IMessageBrokerOptions => {
    const url = configService.get<string>(ConfigTokens.MessageBrokerOptions.Url);

    if (!url) {
      throw new Error("Please provide env.MESSAGE_BROKER_URL (e.g. amqp://admin:admin@localhost)");
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
