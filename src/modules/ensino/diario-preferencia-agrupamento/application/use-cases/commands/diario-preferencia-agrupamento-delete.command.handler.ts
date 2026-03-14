import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IDiarioPreferenciaAgrupamentoDeleteCommand,
  IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../../domain/repositories";

@Injectable()
export class DiarioPreferenciaAgrupamentoDeleteCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoDeleteCommandHandler
{
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioPreferenciaAgrupamentoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission(
      "diario_preferencia_agrupamento:delete",
      { dto },
      dto.id,
    );

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, DiarioPreferenciaAgrupamento.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
