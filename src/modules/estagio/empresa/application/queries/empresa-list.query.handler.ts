import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEmpresaListQuery,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import { IEmpresaRepository } from "../../domain/repositories";
import type { EmpresaListOutputDto } from "../dtos";

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
  }: IEmpresaListQuery): Promise<EmpresaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
