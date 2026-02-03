import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CONFIG_PORT, IConfigPort } from "@/modules/@shared/application/ports/out/config";
import { MessageBrokerContainerService } from "./message-broker-container.service";

@Injectable()
export class MessageBrokerService {
  private readonly logger = new Logger(MessageBrokerService.name);

  constructor(
    private messageBrokerContainerService: MessageBrokerContainerService,
    @Inject(CONFIG_PORT)
    private readonly configPort: IConfigPort,
  ) {}

  async publishDbEvent() {
    try {
      const broker = await this.messageBrokerContainerService.getBroker();

      await broker.publish("gerar_horario", this.getMock());

      return "O Horario será gerado!";
    } catch (e) {
      Logger.error(e);
    }

    return new NotFoundException();
  }

  getMock() {
    return {
      diaSemanaInicio: 1,
      diaSemanaFim: 5,
      turmas: [
        {
          id: "1",
          nome: "1A INFORMATICA",
          diariosDaTurma: [
            {
              id: "diario:1_3",
              turmaId: "turma:1",
              professorId: "1",
              disciplinaId: "disciplina:3",
              quantidadeMaximaSemana: 1,
            },
            {
              id: "diario:1_1",
              turmaId: "turma:1",
              professorId: "2",
              disciplinaId: "disciplina:1",
              quantidadeMaximaSemana: 3,
            },
            {
              id: "diario:1_2",
              turmaId: "turma:1",
              professorId: "2",
              disciplinaId: "disciplina:2",
              quantidadeMaximaSemana: 2,
            },
          ],
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: { horarioInicio: "07:30", horarioFim: "11:59:59" },
            },
            {
              diaSemanaIso: 2,
              intervalo: { horarioInicio: "07:30", horarioFim: "11:59:59" },
            },
            {
              diaSemanaIso: 3,
              intervalo: { horarioInicio: "07:30", horarioFim: "11:59:59" },
            },
            {
              diaSemanaIso: 4,
              intervalo: { horarioInicio: "07:30", horarioFim: "11:59:59" },
            },
            {
              diaSemanaIso: 5,
              intervalo: { horarioInicio: "13:00", horarioFim: "17:29:59" },
            },
          ],
        },
      ],
      professores: [
        {
          id: "1",
          nome: "Flinstons",
          disponibilidades: [
            { diaSemanaIso: 1, intervalo: { horarioInicio: "13:00", horarioFim: "17:29:59" } },
            { diaSemanaIso: 2, intervalo: { horarioInicio: "07:30", horarioFim: "17:29:59" } },
          ],
        },
      ],
      horariosDeAula: [
        { horarioInicio: "07:30", horarioFim: "08:19:59" },
        { horarioInicio: "08:20", horarioFim: "09:09:59" },
      ],
      logDebug: false,
    };
  }

  async publishTimetableRequest<TRequest, TResponse>(request: TRequest, timeoutMs = 60000): Promise<TResponse> {
    const broker = await this.messageBrokerContainerService.getBroker();
    const queueRequest = this.configPort.getMessageBrokerQueueTimetableRequest();
    const queueResponse = this.configPort.getMessageBrokerQueueTimetableResponse();

    return new Promise<TResponse>(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        subscription?.cancel();
        reject(new Error(`Timeout aguardando resposta da queue ${queueResponse}`));
      }, timeoutMs);

      const subscription = await broker.subscribe(queueResponse);

      subscription.on("message", (_message, content, ackOrNoAck) => {
        clearTimeout(timeout);
        ackOrNoAck();
        subscription.cancel();

        try {
          const response = JSON.parse(content.toString()) as TResponse;
          this.logger.log(`Resposta recebida da queue ${queueResponse}`);
          resolve(response);
        } catch (e) {
          reject(new Error("Erro ao parsear resposta JSON: " + e));
        }
      });

      subscription.on("error", (err) => {
        clearTimeout(timeout);
        subscription.cancel();
        reject(err);
      });

      this.logger.log(`Publicando mensagem na queue ${queueRequest}`);
      await broker.publish(queueRequest, JSON.stringify(request));
    });
  }
}
