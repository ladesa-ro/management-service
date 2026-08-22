import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import type { IJobFailure, IJobOutcome, IQueueService } from "@/domain/abstractions/message-broker";
import { IQueueService as IQueueServiceToken } from "@/domain/abstractions/message-broker";
import { Dep } from "@/domain/dependency-injection";
import type { IQueueOptions } from "@/infrastructure.config/options/queue/queue-options.interface";
import { IQueueOptions as IQueueOptionsToken } from "@/infrastructure.config/options/queue/queue-options.interface";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@Injectable()
export class GerarHorarioResultadoConsumer implements OnModuleInit {
  private readonly logger = new Logger(GerarHorarioResultadoConsumer.name);

  constructor(
    @Dep(IQueueServiceToken) private readonly queueService: IQueueService,
    @Dep(IQueueOptionsToken) private readonly queueOptions: IQueueOptions | null,
    @Dep(IGerarHorarioRepository) private readonly repository: IGerarHorarioRepositoryType,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.queueOptions) {
      this.logger.warn("Fila não configurada, resultados de geração não serão consumidos.");
      return;
    }

    const fila = this.queueOptions.queueTimetableGenerate;

    await this.queueService.onCompleted<Record<string, unknown>>(fila, (resultado) =>
      this.concluir(resultado),
    );

    await this.queueService.onFailed(fila, (falha) => this.falhar(falha));
  }

  private async concluir(outcome: IJobOutcome<Record<string, unknown>>): Promise<void> {
    const solicitacao = await this.repository.loadById(outcome.jobId);

    if (!solicitacao) {
      this.logger.warn(`Solicitação ${outcome.jobId} não encontrada ao concluir a geração.`);
      return;
    }

    solicitacao.markAsSucesso(outcome.result ?? {});
    await this.repository.save(solicitacao);

    this.logger.log(`Solicitação ${outcome.jobId} concluída com sucesso.`);
  }

  private async falhar(failure: IJobFailure): Promise<void> {
    const solicitacao = await this.repository.loadById(failure.jobId);

    if (!solicitacao) {
      this.logger.warn(`Solicitação ${failure.jobId} não encontrada ao registrar a falha.`);
      return;
    }

    solicitacao.markAsErro({ reason: failure.reason });
    await this.repository.save(solicitacao);

    this.logger.error(`Solicitação ${failure.jobId} falhou: ${failure.reason}`);
  }
}
