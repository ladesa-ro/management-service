import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IModalidadeListQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import type { ModalidadeListQuery, ModalidadeListQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@Impl()
export class ModalidadeListQueryHandlerImpl implements IModalidadeListQueryHandler {
  constructor(
    @Dep(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ModalidadeListQuery | null,
  ): Promise<ModalidadeListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
