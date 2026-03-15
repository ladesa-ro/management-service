import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { DiarioPreferenciaAgrupamentoUpdateCommand } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command";
import { IDiarioPreferenciaAgrupamentoUpdateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.types";
import type { DiarioPreferenciaAgrupamentoFindOneQuery } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries";
import { IDiarioPreferenciaAgrupamentoPermissionChecker } from "../../domain/authorization";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoUpdateCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoUpdateCommandHandler
{
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoPermissionChecker)
    private readonly permissionChecker: IDiarioPreferenciaAgrupamentoPermissionChecker,
    @DeclareDependency(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioPreferenciaAgrupamentoFindOneQuery & DiarioPreferenciaAgrupamentoUpdateCommand,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, DiarioPreferenciaAgrupamento.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = DiarioPreferenciaAgrupamento.fromData(current);
    domain.atualizar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const updateData: Partial<PersistInput<IDiarioPreferenciaAgrupamento>> = {
      diaSemanaIso: domain.diaSemanaIso,
      aulasSeguidas: domain.aulasSeguidas,
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    };
    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioFindOneHandler.execute(accessContext, dto.diario);
      ensureExists(diario, Diario.entityName, dto.diario.id);
      updateData.diario = { id: diario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, DiarioPreferenciaAgrupamento.entityName, dto.id);

    return result;
  }
}
