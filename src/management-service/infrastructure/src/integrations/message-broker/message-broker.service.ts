import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { MessageBrokerContainerService } from "./message-broker-container.service";

@Injectable()
export class MessageBrokerService {
  constructor(
    //

    private messageBrokerContainerService: MessageBrokerContainerService,
  ) {}

  async publishDbEvent() {
    try {
      const broker = await this.messageBrokerContainerService.getBroker();

      await broker.publish("gerar_horario", this.getMock());
      //.then(
      // (publicationSession) =>
      //     new Promise<void>((resolve, reject) => {
      //         publicationSession.on('error', (err, messageId) => {
      //             if (messageId === dbEvent.id) {
      //                 reject(err);
      //             }
      //         });

      //         publicationSession.on('success', (messageId) => {
      //             if (messageId === dbEvent.id) {
      //                 resolve();
      //             }
      //         });
      //     }),
      //  );
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
              professorId: "1",
              disciplinaId: "disciplina:2",
              quantidadeMaximaSemana: 2,
            },
          ],
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "13:00",
                horarioFim: "17:29:59",
              },
            },
          ],
        },
        {
          id: "2",
          nome: "1B INFORMATICA",
          diariosDaTurma: [
            {
              id: "diario:2_1",
              turmaId: "turma:2",
              professorId: "2",
              disciplinaId: "disciplina:4",
              quantidadeMaximaSemana: 1,
            },
            {
              id: "diario:2_3",
              turmaId: "turma:2",
              professorId: "1",
              disciplinaId: "disciplina:1",
              quantidadeMaximaSemana: 3,
            },
            {
              id: "diario:2_2",
              turmaId: "turma:2",
              professorId: "2",
              disciplinaId: "disciplina:2",
              quantidadeMaximaSemana: 2,
            },
          ],
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "13:00",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
          ],
        },
        {
          id: "3",
          nome: "1 PERIODO ADS",
          diariosDaTurma: [
            {
              id: "diario:3_1",
              turmaId: "turma:3",
              professorId: "2",
              disciplinaId: "disciplina:4",
              quantidadeMaximaSemana: 1,
            },
            {
              id: "diario:3_3",
              turmaId: "turma:3",
              professorId: "1",
              disciplinaId: "disciplina:1",
              quantidadeMaximaSemana: 3,
            },
            {
              id: "diario:3_2",
              turmaId: "turma:3",
              professorId: "2",
              disciplinaId: "disciplina:2",
              quantidadeMaximaSemana: 2,
            },
          ],
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
          ],
        },
        {
          id: "4",
          nome: "2 PERIODO ADS",
          diariosDaTurma: [
            {
              id: "diario:4_1",
              turmaId: "turma:4",
              professorId: "2",
              disciplinaId: "disciplina:4",
              quantidadeMaximaSemana: 1,
            },
            {
              id: "diario:4_3",
              turmaId: "turma:4",
              professorId: "1",
              disciplinaId: "disciplina:1",
              quantidadeMaximaSemana: 3,
            },
            {
              id: "diario:4_2",
              turmaId: "turma:4",
              professorId: "2",
              disciplinaId: "disciplina:2",
              quantidadeMaximaSemana: 2,
            },
          ],
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
          ],
        },
      ],
      professores: [
        {
          id: "1",
          nome: "Flinstons",
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "13:00",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
          ],
        },
        {
          id: "2",
          nome: "Poucas",
          disponibilidades: [
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "11:59:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "13:00",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "07:30",
                horarioFim: "17:29:59",
              },
            },
            {
              diaSemanaIso: 1,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 2,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 3,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
            {
              diaSemanaIso: 4,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "22:39:59",
              },
            },
            {
              diaSemanaIso: 5,
              intervalo: {
                horarioInicio: "19:00",
                horarioFim: "23:29:59",
              },
            },
          ],
        },
      ],
      horariosDeAula: [
        {
          horarioInicio: "07:30",
          horarioFim: "08:19:59",
        },
        {
          horarioInicio: "08:20",
          horarioFim: "09:09:59",
        },
        {
          horarioInicio: "09:10",
          horarioFim: "09:59:59",
        },
        {
          horarioInicio: "10:20",
          horarioFim: "11:09:59",
        },
        {
          horarioInicio: "11:10",
          horarioFim: "11:59:59",
        },
        {
          horarioInicio: "13:00",
          horarioFim: "13:49:59",
        },
        {
          horarioInicio: "13:50",
          horarioFim: "14:39:59",
        },
        {
          horarioInicio: "14:40",
          horarioFim: "15:29:59",
        },
        {
          horarioInicio: "15:50",
          horarioFim: "16:39:59",
        },
        {
          horarioInicio: "16:40",
          horarioFim: "17:29:59",
        },
        {
          horarioInicio: "19:00",
          horarioFim: "19:49:59",
        },
        {
          horarioInicio: "19:50",
          horarioFim: "20:39:59",
        },
        {
          horarioInicio: "20:40",
          horarioFim: "21:29:59",
        },
        {
          horarioInicio: "21:50",
          horarioFim: "22:39:59",
        },
        {
          horarioInicio: "22:40",
          horarioFim: "23:29:59",
        },
      ],
      logDebug: false,
    };
  }
}
