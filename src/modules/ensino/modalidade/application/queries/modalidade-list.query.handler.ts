import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IModalidadeListQuery,
  IModalidadeListQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import { IModalidadeRepository } from "../../domain/repositories";
import type { ModalidadeListOutputDto } from "../dtos";

@DeclareImplementation()
export class ModalidadeListQueryHandlerImpl implements IModalidadeListQueryHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IModalidadeListQuery): Promise<ModalidadeListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
