import { Inject, Injectable } from "@nestjs/common";
import {
  type IEmpresaListQuery,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import { EMPRESA_REPOSITORY_PORT, type IEmpresaRepositoryPort } from "../../../domain/repositories";
import type { EmpresaListOutputDto } from "../../dtos";

@Injectable()
export class EmpresaListQueryHandlerImpl implements IEmpresaListQueryHandler {
  constructor(
    @Inject(EMPRESA_REPOSITORY_PORT)
    private readonly repository: IEmpresaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEmpresaListQuery): Promise<EmpresaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
