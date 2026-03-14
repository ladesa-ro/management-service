import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioListQuery,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import { IDiarioRepository } from "../../domain/repositories";
import type { DiarioListOutputDto } from "../dtos";

@Injectable()
export class DiarioListQueryHandlerImpl implements IDiarioListQueryHandler {
  constructor(
    @Inject(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute({ accessContext, dto, selection }: IDiarioListQuery): Promise<DiarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
