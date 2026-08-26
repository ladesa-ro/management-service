import { ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaAvaliacaoFindOneQueryHandler, IEmpresaAvaliacaoRepository } from "../../domain";
import type {
  EmpresaAvaliacaoFindOneQuery,
  EmpresaAvaliacaoFindOneQueryResult,
} from "../../domain/queries";

@Impl()
export class EmpresaAvaliacaoFindOneQueryHandlerImpl
  implements IEmpresaAvaliacaoFindOneQueryHandler
{
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoFindOneQuery,
  ): Promise<EmpresaAvaliacaoFindOneQueryResult | null> {
    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    if (!result) {
      throw new ResourceNotFoundError("Avaliação não encontrada.");
    }
    return result;
  }
}
