import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioPreferenciaAgrupamentoFindOneQuery,
  IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-find-one.query.handler.interface";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";
import type { DiarioPreferenciaAgrupamentoFindOneOutputDto } from "../dtos";

@Injectable()
export class DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoFindOneQueryHandler
{
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioPreferenciaAgrupamentoFindOneQuery): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
