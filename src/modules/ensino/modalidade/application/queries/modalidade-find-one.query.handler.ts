import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IModalidadeFindOneQuery,
  IModalidadeFindOneQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { ModalidadeFindOneQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeFindOneQueryHandlerImpl implements IModalidadeFindOneQueryHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IModalidadeFindOneQuery): Promise<ModalidadeFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
