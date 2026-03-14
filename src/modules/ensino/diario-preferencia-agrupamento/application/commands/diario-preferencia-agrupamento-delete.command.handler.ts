import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IDiarioPreferenciaAgrupamentoDeleteCommand,
  IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import { IDiarioPreferenciaAgrupamentoPermissionChecker } from "../../domain/authorization";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@Injectable()
export class DiarioPreferenciaAgrupamentoDeleteCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoDeleteCommandHandler
{
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
    @Inject(IDiarioPreferenciaAgrupamentoPermissionChecker)
    private readonly permissionChecker: IDiarioPreferenciaAgrupamentoPermissionChecker,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioPreferenciaAgrupamentoDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, DiarioPreferenciaAgrupamento.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
