import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Dep } from "@/domain/dependency-injection";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Injectable()
export class FolhaPontoExpiracaoJob {
  private readonly logger = new Logger(FolhaPontoExpiracaoJob.name);

  constructor(@Dep(IFolhaPontoRepository) private readonly repository: IFolhaPontoRepository) {}

  @Cron(CronExpression.EVERY_HOUR)
  async executar(): Promise<void> {
    const ttlHours = parseInt(process.env.FOLHA_PONTO_TOKEN_TTL_HOURS ?? "72", 10);
    const vencidas = await this.repository.findExpiredPending(ttlHours);

    if (vencidas.length > 0) {
      this.logger.log(`Expirando ${vencidas.length} folhas de ponto pendentes (TTL=${ttlHours}h).`);
    }

    for (const folha of vencidas) {
      try {
        folha.expire();
        await this.repository.save(folha);
        this.logger.log(`FolhaPonto ${folha.id} marcada como EXPIRED.`);
      } catch (error) {
        this.logger.error(`Erro ao expirar FolhaPonto ${folha.id}:`, error);
      }
    }
  }
}
