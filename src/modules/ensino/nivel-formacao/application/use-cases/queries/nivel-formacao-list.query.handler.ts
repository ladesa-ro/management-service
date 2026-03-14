import { Inject, Injectable } from "@nestjs/common";
import {
  type INivelFormacaoListQuery,
  INivelFormacaoListQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import {
  type INivelFormacaoRepositoryPort,
  NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { NivelFormacaoListOutputDto } from "../../dtos";

@Injectable()
export class NivelFormacaoListQueryHandlerImpl implements INivelFormacaoListQueryHandler {
  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: INivelFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoListQuery): Promise<NivelFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
