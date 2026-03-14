import { Inject, Injectable } from "@nestjs/common";
import {
  type IBlocoListQuery,
  IBlocoListQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import type { BlocoListOutputDto } from "../../dtos";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../ports";

@Injectable()
export class BlocoListQueryHandlerImpl implements IBlocoListQueryHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: IBlocoListQuery): Promise<BlocoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
