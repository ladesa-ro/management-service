import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type INivelFormacaoListQuery,
  INivelFormacaoListQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import { INivelFormacaoRepository } from "../../domain/repositories";
import type { NivelFormacaoListOutputDto } from "../dtos";

@DeclareImplementation()
export class NivelFormacaoListQueryHandlerImpl implements INivelFormacaoListQueryHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoListQuery): Promise<NivelFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
