import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEmpresaListQuery,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import type { EmpresaListQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaListQueryHandlerImpl implements IEmpresaListQueryHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEmpresaListQuery): Promise<EmpresaListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
