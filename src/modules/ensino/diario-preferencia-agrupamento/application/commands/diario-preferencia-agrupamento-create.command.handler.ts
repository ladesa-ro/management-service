import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioPreferenciaAgrupamentoCreateCommand,
  IDiarioPreferenciaAgrupamentoCreateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import { IDiarioPreferenciaAgrupamentoPermissionChecker } from "../../domain/authorization";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoCreateCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoCreateCommandHandler
{
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoPermissionChecker)
    private readonly permissionChecker: IDiarioPreferenciaAgrupamentoPermissionChecker,
    @DeclareDependency(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioPreferenciaAgrupamentoCreateCommand): Promise<DiarioPreferenciaAgrupamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let diarioRef: { id: string } | undefined;
    if (dto.diario) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: dto.diario,
      });
      ensureExists(diario, Diario.entityName, dto.diario.id);
      diarioRef = { id: diario.id };
    }
    const domain = DiarioPreferenciaAgrupamento.criar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diario: diarioRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, DiarioPreferenciaAgrupamento.entityName, id);

    return result;
  }
}
