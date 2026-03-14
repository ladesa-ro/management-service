import { Inject, Injectable } from "@nestjs/common";
import {
  type IModalidadeFindOneQuery,
  IModalidadeFindOneQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { ModalidadeFindOneOutputDto } from "../../dtos";
import { type IModalidadeRepositoryPort, MODALIDADE_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ModalidadeFindOneQueryHandlerImpl implements IModalidadeFindOneQueryHandler {
  constructor(
    @Inject(MODALIDADE_REPOSITORY_PORT)
    private readonly repository: IModalidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IModalidadeFindOneQuery): Promise<ModalidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
