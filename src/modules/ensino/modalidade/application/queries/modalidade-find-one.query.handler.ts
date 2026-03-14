import { Inject, Injectable } from "@nestjs/common";
import {
  type IModalidadeFindOneQuery,
  IModalidadeFindOneQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import { IModalidadeRepository } from "../../domain/repositories";
import type { ModalidadeFindOneOutputDto } from "../dtos";

@Injectable()
export class ModalidadeFindOneQueryHandlerImpl implements IModalidadeFindOneQueryHandler {
  constructor(
    @Inject(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IModalidadeFindOneQuery): Promise<ModalidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
