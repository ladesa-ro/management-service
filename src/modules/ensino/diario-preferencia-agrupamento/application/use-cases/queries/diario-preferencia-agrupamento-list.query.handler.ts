import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioPreferenciaAgrupamentoListQuery,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import type { DiarioPreferenciaAgrupamentoListOutputDto } from "../../dtos";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../../ports";

@Injectable()
export class DiarioPreferenciaAgrupamentoListQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoListQueryHandler
{
  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioPreferenciaAgrupamentoListQuery): Promise<DiarioPreferenciaAgrupamentoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
