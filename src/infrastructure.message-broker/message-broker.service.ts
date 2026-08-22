import { ServiceUnavailableError } from "@/application/errors";
import { ILoggerPort } from "@/domain/abstractions";
import type { IMessageBrokerService, IQueueService } from "@/domain/abstractions/message-broker";
import { IQueueService as IQueueServiceToken } from "@/domain/abstractions/message-broker";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { IQueueOptions } from "@/infrastructure.config/options/queue/queue-options.interface";
import { IQueueOptions as IQueueOptionsToken } from "@/infrastructure.config/options/queue/queue-options.interface";

@Impl()
export class MessageBrokerService implements IMessageBrokerService {
  constructor(
    @Dep(IQueueServiceToken)
    private readonly queueService: IQueueService,
    @Dep(IQueueOptionsToken)
    private readonly opcoes: IQueueOptions | null,
    @Dep(ILoggerPort)
    private readonly logger: ILoggerPort,
  ) {}

  async publishTimetableRequest<TRequest, TResponse>(
    request: TRequest,
    timeoutMs = 60000,
  ): Promise<TResponse> {
    const fila = this.#exigirOpcoes().queueTimetableGenerate;
    this.logger.log(`Enfileirando pedido de horário na fila ${fila}`, "MessageBroker");
    return this.#comTimeoutLocal(
      this.queueService.request<TRequest, TResponse>(fila, request, timeoutMs),
      timeoutMs,
      `Timeout aguardando resposta da fila ${fila}`,
    );
  }

  async publishTimetableRequestFireAndForget<TRequest>(
    request: TRequest,
    jobId?: string,
  ): Promise<string> {
    const fila = this.#exigirOpcoes().queueTimetableGenerate;
    const enfileirado = await this.queueService.enqueue(fila, request, { jobId });
    this.logger.log(
      `Pedido de horário enfileirado na fila ${fila}, job ${enfileirado}`,
      "MessageBroker",
    );
    return enfileirado;
  }

  async publishFolhaPontoCreated<TPayload>(payload: TPayload): Promise<string> {
    const fila = this.#exigirOpcoes().queueFolhaPontoWhatsapp;
    const jobId = await this.queueService.enqueue(fila, payload);
    this.logger.log(
      `Notificação de folha de ponto enfileirada na fila ${fila}, job ${jobId}`,
      "MessageBroker",
    );
    return jobId;
  }

  #exigirOpcoes(): IQueueOptions {
    if (!this.opcoes) {
      throw new ServiceUnavailableError(undefined, "queue");
    }

    return this.opcoes;
  }

  #comTimeoutLocal<T>(promise: Promise<T>, timeoutMs: number, mensagem: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(mensagem)), timeoutMs);
      promise.then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        (error) => {
          clearTimeout(timer);
          reject(error);
        },
      );
    });
  }
}
