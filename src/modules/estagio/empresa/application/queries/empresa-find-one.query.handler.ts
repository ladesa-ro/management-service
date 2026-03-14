import { Inject, Injectable } from "@nestjs/common";
import {
  type IEmpresaFindOneQuery,
  IEmpresaFindOneQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import { IEmpresaRepository } from "../../domain/repositories";
import type { EmpresaFindOneOutputDto } from "../dtos";

@Injectable()
export class EmpresaFindOneQueryHandlerImpl implements IEmpresaFindOneQueryHandler {
  constructor(
    @Inject(IEmpresaRepository)
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
