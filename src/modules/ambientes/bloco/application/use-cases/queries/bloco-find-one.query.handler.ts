import { Inject, Injectable } from "@nestjs/common";
import {
  type IBlocoFindOneQuery,
  IBlocoFindOneQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../../domain/repositories";
import type { BlocoFindOneOutputDto } from "../../dtos";

@Injectable()
export class BlocoFindOneQueryHandlerImpl implements IBlocoFindOneQueryHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IBlocoFindOneQuery): Promise<BlocoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
