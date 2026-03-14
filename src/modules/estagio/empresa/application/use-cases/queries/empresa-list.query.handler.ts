import { Inject, Injectable } from "@nestjs/common";
import {
  type IEmpresaListQuery,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import { IEmpresaRepository } from "../../../domain/repositories";
import type { EmpresaListOutputDto } from "../../dtos";

@Injectable()
export class EmpresaListQueryHandlerImpl implements IEmpresaListQueryHandler {
  constructor(
    @Inject(IEmpresaRepository)
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
