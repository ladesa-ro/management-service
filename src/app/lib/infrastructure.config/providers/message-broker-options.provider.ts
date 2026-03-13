import { Provider } from "@nestjs/common";
import type { IMessageBrokerOptions } from "../options/message-broker-options.interface";
import { IMessageBrokerOptions as IMessageBrokerOptionsToken } from "../options/message-broker-options.interface";
import type { IConfigService } from "../config-service.interface";
import { IConfigService as IConfigServiceToken } from "../config-service.interface";
import { EnvKeys } from "../env-keys";

export const MessageBrokerOptionsProvider: Provider = {
  provide: IMessageBrokerOptionsToken,
  useFactory: (configService: IConfigService): IMessageBrokerOptions => {
    const url = configService.get<string>(EnvKeys.MESSAGE_BROKER_URL);

    if (!url) {
      throw new Error("Please provide env.MESSAGE_BROKER_URL (e.g. amqp://admin:admin@localhost)");
    }

    return {
      url,
      queueTimetableRequest:
        configService.get<string>(EnvKeys.MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST) ??
        "dev.timetable_generate.request",
      queueTimetableResponse:
        configService.get<string>(EnvKeys.MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE) ??
        "dev.timetable_generate.response",
    };
  },
  inject: [IConfigServiceToken],
};
