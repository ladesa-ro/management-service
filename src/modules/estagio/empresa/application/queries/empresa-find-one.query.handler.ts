import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEmpresaFindOneQuery,
  IEmpresaFindOneQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import type { EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaFindOneQueryHandlerImpl implements IEmpresaFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEmpresaFindOneQuery): Promise<EmpresaFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
