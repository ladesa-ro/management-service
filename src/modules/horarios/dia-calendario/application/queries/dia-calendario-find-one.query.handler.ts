import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiaCalendarioFindOneQuery,
  IDiaCalendarioFindOneQueryHandler,
} from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-find-one.query.handler.interface";
import { IDiaCalendarioRepository } from "../../domain/repositories";
import type { DiaCalendarioFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class DiaCalendarioFindOneQueryHandlerImpl implements IDiaCalendarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiaCalendarioFindOneQuery): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
