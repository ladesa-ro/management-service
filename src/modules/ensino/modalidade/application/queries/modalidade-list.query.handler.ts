import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IModalidadeListQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import type { ModalidadeListQuery, ModalidadeListQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeListQueryHandlerImpl implements IModalidadeListQueryHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: ModalidadeListQuery | null,
  ): Promise<ModalidadeListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
