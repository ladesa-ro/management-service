import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Dep } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import { EstagioNotificacaoPushService } from "../services/estagio-notificacao-push.service";

/**
 * Cron jobs de alertas de prazo para o módulo de Estágios.
 *
 * Executa diariamente às 08:00 e verifica:
 *  - Estágios com dataFim nos próximos 30, 15 ou 7 dias
 *  - Estágios com prazo vencido e não encerrados
 *  - Estágios sem orientador vinculado
 *  - Estágios com visitas pendentes
 */
@Injectable()
export class EstagioAlertaCronService {
  private readonly logger = new Logger(EstagioAlertaCronService.name);

  constructor(
    @Dep(IAppTypeormConnection)
    private readonly connection: IAppTypeormConnection,
    private readonly pushService: EstagioNotificacaoPushService,
  ) {}

  /**
   * Executa diariamente às 08:00.
   * Notifica todos os estágios ativos com prazo próximo ou vencido.
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async verificarPrazos(): Promise<void> {
    this.logger.log("[Cron] Iniciando verificação de prazos de estágios...");

    try {
      const repo = this.connection.getRepository(EstagioTypeormEntity);
      const hoje = new Date();

      // Busca estágios ativos com dataFim definida
      const estagios = await repo
        .createQueryBuilder("e")
        .leftJoinAndSelect("e.estagiario", "est")
        .leftJoinAndSelect("est.perfil", "perfil")
        .leftJoinAndSelect("perfil.usuario", "usuario")
        .where("e.date_deleted IS NULL")
        .andWhere("e.data_fim IS NOT NULL")
        .andWhere("e.status NOT IN (:...encerrados)", {
          encerrados: [EstagioStatus.ENCERRADO, EstagioStatus.RESCINDIDO],
        })
        .getMany();

      let alertasEmitidos = 0;

      for (const estagio of estagios) {
        if (!estagio.dataFim) continue;

        const dataFim = new Date(estagio.dataFim);
        const diffMs = dataFim.getTime() - hoje.getTime();
        const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        // Nome do estagiário para o payload (best-effort)
        const estagiarioNome: string | undefined =
          (estagio.estagiario as any)?.perfil?.usuario?.nome ?? undefined;

        // Prazo vencido
        if (diasRestantes < 0) {
          this.pushService.notificarPrazoVencendo(
            estagio.id,
            diasRestantes,
            estagio.dataFim,
            estagiarioNome,
          );
          alertasEmitidos++;
          continue;
        }

        // 7, 15 ou 30 dias restantes
        if ([7, 15, 30].includes(diasRestantes)) {
          this.pushService.notificarPrazoVencendo(
            estagio.id,
            diasRestantes,
            estagio.dataFim,
            estagiarioNome,
          );
          alertasEmitidos++;
        }
      }

      this.logger.log(`[Cron] Verificação concluída. ${alertasEmitidos} alerta(s) emitido(s).`);
    } catch (error) {
      this.logger.error("[Cron] Erro ao verificar prazos de estágios:", error);
    }
  }

  /**
   * Executa semanalmente às segundas-feiras às 09:00.
   * Verifica estágios sem orientador e com visitas pendentes.
   */
  @Cron("0 9 * * 1")
  async verificarInconsistencias(): Promise<void> {
    this.logger.log("[Cron] Iniciando verificação de inconsistências de estágios...");

    try {
      const repo = this.connection.getRepository(EstagioTypeormEntity);

      const estagiosAtivos = await repo
        .createQueryBuilder("e")
        .leftJoinAndSelect("e.estagiario", "est")
        .leftJoinAndSelect("est.perfil", "perfil")
        .leftJoinAndSelect("perfil.usuario", "usuario")
        .where("e.date_deleted IS NULL")
        .andWhere("e.status = :status", { status: EstagioStatus.EM_ANDAMENTO })
        .getMany();

      for (const estagio of estagiosAtivos) {
        const estagiarioNome: string | undefined =
          (estagio.estagiario as any)?.perfil?.usuario?.nome ?? undefined;

        // Sem orientador
        if (!estagio.usuarioOrientador) {
          this.pushService.notificarOrientadorAusente(estagio.id, estagiarioNome);
        }

        // Visitas a vencer
        if (estagio.visitasAVencer && estagio.visitasAVencer > 0) {
          this.pushService.notificarVisitasAVencer(
            estagio.id,
            estagio.visitasAVencer,
            estagiarioNome,
          );
        }

        // Visitas não realizadas sem justificativa
        if (estagio.visitasNaoRealizadas && estagio.visitasNaoRealizadas > 0) {
          this.pushService.notificarVisitasNaoRealizadas(
            estagio.id,
            estagio.visitasNaoRealizadas,
            estagiarioNome,
          );
        }

        // Sem seguro
        if (!estagio.nomeSeguradora && !estagio.numeroApoliceSeguro) {
          this.pushService.notificarSeguroAusente(estagio.id, estagiarioNome);
        }
      }

      this.logger.log("[Cron] Verificação de inconsistências concluída.");
    } catch (error) {
      this.logger.error("[Cron] Erro ao verificar inconsistências:", error);
    }
  }
}
