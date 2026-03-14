import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiaCalendarioFindOneQuery,
  IDiaCalendarioFindOneQueryHandler,
} from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-find-one.query.handler.interface";
import { IDiaCalendarioRepository } from "../../domain/repositories";
import type { DiaCalendarioFindOneOutputDto } from "../dtos";

@Injectable()
export class DiaCalendarioFindOneQueryHandlerImpl implements IDiaCalendarioFindOneQueryHandler {
  constructor(
    @Inject(IDiaCalendarioRepository)
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
