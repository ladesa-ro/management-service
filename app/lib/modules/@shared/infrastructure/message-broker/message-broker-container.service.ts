import { Inject, Injectable } from "@nestjs/common";
import { BrokerAsPromised as Broker, BrokerConfig } from "rascal";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";

@Injectable()
export class MessageBrokerContainerService {
  #broker: Broker | null = null;

  constructor(
    @Inject(CONFIG_PORT)
    private readonly configPort: IConfigPort,
  ) {}

  async setup() {
    if (this.#broker === null) {
      const config = this.getConfig();

      const broker = await Broker.create(config);

      broker.on("error", console.error);

      this.#broker = broker;
    }

    return this.#broker;
  }

  async getBroker() {
    const broker = await this.setup();
    return broker;
  }

  getConfig(): BrokerConfig {
    const messageBrokerUrl = this.configPort.getMessageBrokerUrl();
    const queueTimetableRequest = this.configPort.getMessageBrokerQueueTimetableRequest();
    const queueTimetableResponse = this.configPort.getMessageBrokerQueueTimetableResponse();

    const config: BrokerConfig = {
      vhosts: {
        "/": {
          connection: {
            url: messageBrokerUrl,
          },
          queues: [
            {
              name: "horario_gerado",
              options: {
                durable: true,
              },
            },
            {
              name: "gerar_horario",
              options: {
                durable: true,
              },
            },
            {
              name: queueTimetableRequest,
              options: {
                durable: true,
              },
            },
            {
              name: queueTimetableResponse,
              options: {
                durable: true,
              },
            },
          ],
          subscriptions: {
            horario_gerado: {
              queue: "horario_gerado",
              prefetch: 1,
              contentType: "text/plain",
              options: {
                noAck: false,
              },
            },
            [queueTimetableResponse]: {
              queue: queueTimetableResponse,
              prefetch: 1,
              contentType: "application/json",
              options: {
                noAck: false,
              },
            },
          },
          publications: {
            gerar_horario: {
              queue: "gerar_horario",
            },
            [queueTimetableRequest]: {
              queue: queueTimetableRequest,
            },
          },
        },
      },
    };
    return config;
  }
}
