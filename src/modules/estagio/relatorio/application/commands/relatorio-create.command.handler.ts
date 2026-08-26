import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import type { RelatorioCreateCommand } from "../../domain/commands/relatorio-create.command";
import { IRelatorioCreateCommandHandler } from "../../domain/commands/relatorio-create.command.handler.interface";
import type { RelatorioFindOneQueryResult } from "../../domain/queries";
import { Relatorio } from "../../domain/relatorio";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioCreateCommandHandlerImpl implements IRelatorioCreateCommandHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: RelatorioCreateCommand,
  ): Promise<RelatorioFindOneQueryResult> {
    const estagio = await this.estagioRepository.loadById(accessContext, dto.estagio.id);
    ensureExists(estagio, "Estagio", dto.estagio.id);

    // Se já existir um relatório para o estágio (unique), atualiza (upsert)
    const existing = await this.repository.findByEstagioId(dto.estagio.id);

    if (existing) {
      existing.update((dto.conteudoJson as Record<string, any>) ?? null);
      await this.repository.save(existing);
      const result = await this.repository.getFindOneQueryResult(accessContext, {
        id: existing.id,
      });
      ensureExists(result, Relatorio.entityName, existing.id);
      return result!;
    }

    const relatorio = Relatorio.create(dto);
    await this.repository.save(relatorio);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: relatorio.id });
    ensureExists(result, Relatorio.entityName, relatorio.id);
    return result!;
  }
}
