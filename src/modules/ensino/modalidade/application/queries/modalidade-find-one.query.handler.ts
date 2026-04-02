import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { ModalidadeFindOneQuery, ModalidadeFindOneQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@Impl()
export class ModalidadeFindOneQueryHandlerImpl implements IModalidadeFindOneQueryHandler {
  constructor(
    @Dep(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ModalidadeFindOneQuery,
  ): Promise<ModalidadeFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
