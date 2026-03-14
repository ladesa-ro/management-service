import { Inject, Injectable } from "@nestjs/common";
import {
  type INivelFormacaoFindOneQuery,
  INivelFormacaoFindOneQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import {
  type INivelFormacaoRepositoryPort,
  NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { NivelFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class NivelFormacaoFindOneQueryHandlerImpl implements INivelFormacaoFindOneQueryHandler {
  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: INivelFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoFindOneQuery): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
