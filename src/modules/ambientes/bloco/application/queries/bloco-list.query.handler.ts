import { Inject, Injectable } from "@nestjs/common";
import {
  type IBlocoListQuery,
  IBlocoListQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import { IBlocoRepository } from "../../domain/repositories";
import type { BlocoListOutputDto } from "../dtos";

@Injectable()
export class BlocoListQueryHandlerImpl implements IBlocoListQueryHandler {
  constructor(
    @Inject(IBlocoRepository)
    private readonly repository: IBlocoRepository,
  ) {}

  async execute({ accessContext, dto, selection }: IBlocoListQuery): Promise<BlocoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
