import { type OnModuleInit } from "@nestjs/common";
import { BrokerAsPromised as Broker, BrokerConfig } from "rascal";
import { ServiceUnavailableError } from "@/application/errors";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { IMessageBrokerOptions } from "@/infrastructure.config/options/message-broker/message-broker-options.interface";
import { IMessageBrokerOptions as IMessageBrokerOptionsToken } from "@/infrastructure.config/options/message-broker/message-broker-options.interface";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";
import { retryWithBackoff } from "@/shared/resilience/retry-with-backoff";

const DEPENDENCY_NAME = "message-broker";

@DeclareImplementation()
export class MessageBrokerContainerService implements OnModuleInit {
  #broker: Broker | null = null;
  #connecting = false;

  constructor(
    @DeclareDependency(IMessageBrokerOptionsToken)
    private readonly messageBrokerOptions: IMessageBrokerOptions | null,
    @DeclareDependency(ILoggerPortToken)
    private readonly logger: ILoggerPort,
    @DeclareDependency(IConnectionHealthRegistry)
    private readonly healthRegistry: IConnectionHealthRegistry,
  ) {}

  onModuleInit(): void {
    this.healthRegistry.register(DEPENDENCY_NAME);

    if (!this.messageBrokerOptions) {
      this.healthRegistry.markUnavailable(DEPENDENCY_NAME, "Message broker not configured");
      return;
    }

    this.#startConnectionLoop(this.messageBrokerOptions);
  }

  async getBroker(): Promise<Broker> {
    if (this.#broker) {
      return this.#broker;
    }

    throw new ServiceUnavailableError(undefined, DEPENDENCY_NAME);
  }

  #startConnectionLoop(options: IMessageBrokerOptions): void {
    if (this.#connecting) {
      return;
    }

    this.#connecting = true;

    retryWithBackoff(
      async () => {
        const config = this.#buildConfig(options);
        const broker = await Broker.create(config);

        broker.on("error", (err) => {
          this.logger.error(String(err), undefined, "MessageBroker");
          this.#broker = null;
          this.healthRegistry.markUnavailable(DEPENDENCY_NAME, String(err));
          this.#startConnectionLoop(options);
        });

        this.#broker = broker;
      },
      {
        maxRetries: Number.POSITIVE_INFINITY,
        baseDelayMs: 2000,
        maxDelayMs: 30_000,
        jitterFactor: 0.3,
        onRetry: (attempt, error, delayMs) => {
          const message = error instanceof Error ? error.message : String(error);
          this.healthRegistry.markUnavailable(DEPENDENCY_NAME, message);
          this.logger.warn(
            `Message broker connection attempt #${attempt} failed. Retrying in ${delayMs}ms: ${message}`,
            "MessageBroker",
          );
        },
      },
    )
      .then(() => {
        this.healthRegistry.markHealthy(DEPENDENCY_NAME);
        this.logger.log("Message broker connection established.", "MessageBroker");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `Message broker connection loop terminated unexpectedly: ${message}`,
          undefined,
          "MessageBroker",
        );
      })
      .finally(() => {
        this.#connecting = false;
      });
  }

  #buildConfig(options: IMessageBrokerOptions): BrokerConfig {
    const config: BrokerConfig = {
      vhosts: {
        "/": {
          connection: {
            url: options.url,
          },
          queues: [
            {
              name: options.queueTimetableRequest,
              options: {
                durable: true,
                arguments: {
                  "x-dead-letter-exchange": `dlx.${options.queueTimetableRequest}`,
                },
              },
            },
            {
              name: options.queueTimetableResponse,
              options: {
                durable: true,
              },
            },
          ],
          subscriptions: {
            [options.queueTimetableResponse]: {
              queue: options.queueTimetableResponse,
              prefetch: 1,
              contentType: "application/json",
              options: {
                noAck: false,
              },
            },
          },
          publications: {
            [options.queueTimetableRequest]: {
              queue: options.queueTimetableRequest,
            },
          },
        },
      },
    };
    return config;
  }
}
