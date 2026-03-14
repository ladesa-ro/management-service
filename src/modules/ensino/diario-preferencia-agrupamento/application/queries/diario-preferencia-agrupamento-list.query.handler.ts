import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiarioPreferenciaAgrupamentoListQuery,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";
import type { DiarioPreferenciaAgrupamentoListOutputDto } from "../dtos";

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoListQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoListQueryHandler
{
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoRepository)
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
