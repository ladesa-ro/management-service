import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEmpresaFindOneQuery,
  IEmpresaFindOneQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import { IEmpresaRepository } from "../../domain/repositories";
import type { EmpresaFindOneOutputDto } from "../dtos";

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
  }: IEmpresaFindOneQuery): Promise<EmpresaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
