import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioPreferenciaAgrupamentoListQuery,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../../domain/repositories";
import type { DiarioPreferenciaAgrupamentoListOutputDto } from "../../dtos";

@Injectable()
export class DiarioPreferenciaAgrupamentoListQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoListQueryHandler
{
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioPreferenciaAgrupamentoListQuery): Promise<DiarioPreferenciaAgrupamentoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
