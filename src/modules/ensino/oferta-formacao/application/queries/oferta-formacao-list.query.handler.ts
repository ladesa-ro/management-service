import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IOfertaFormacaoListQuery,
  IOfertaFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import { IOfertaFormacaoRepository } from "../../domain/repositories";
import type { OfertaFormacaoListOutputDto } from "../dtos";

@DeclareImplementation()
export class OfertaFormacaoListQueryHandlerImpl implements IOfertaFormacaoListQueryHandler {
  constructor(
    @DeclareDependency(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoListQuery): Promise<OfertaFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
