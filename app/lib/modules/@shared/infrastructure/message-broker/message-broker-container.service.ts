import { Injectable } from "@nestjs/common";
import { BrokerAsPromised as Broker, BrokerConfig } from "rascal";

@Injectable()
export class MessageBrokerContainerService {
  #broker: Broker | null = null;

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
    const config: BrokerConfig = {
      vhosts: {
        "/": {
          connection: {
            url: "amqp://admin:admin@sisgea-message-broker",
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
          },
          publications: {
            gerar_horario: {
              queue: "gerar_horario",
            },
          },
        },
      },
    };
    return config;
  }
}
