import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { ModalidadeFindOneQuery, ModalidadeFindOneQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeFindOneQueryHandlerImpl implements IModalidadeFindOneQueryHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneQuery,
  ): Promise<ModalidadeFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
