import { BrokerAsPromised as Broker, BrokerConfig } from "rascal";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IMessageBrokerOptions,
  IMessageBrokerOptions as IMessageBrokerOptionsToken,
} from "@/infrastructure.config/options/message-broker/message-broker-options.interface";

@DeclareImplementation()
export class MessageBrokerContainerService {
  #broker: Broker | null = null;

  constructor(
    @DeclareDependency(IMessageBrokerOptionsToken)
    private readonly messageBrokerOptions: IMessageBrokerOptions,
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
    const {
      url: messageBrokerUrl,
      queueTimetableRequest,
      queueTimetableResponse,
    } = this.messageBrokerOptions;

    const config: BrokerConfig = {
      vhosts: {
        "/": {
          connection: {
            url: messageBrokerUrl,
          },
          queues: [
            {
              name: queueTimetableRequest,
              options: {
                durable: true,
                arguments: {
                  "x-dead-letter-exchange": `dlx.${queueTimetableRequest}`,
                },
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
