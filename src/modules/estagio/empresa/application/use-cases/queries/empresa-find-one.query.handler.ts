import { Inject, Injectable } from "@nestjs/common";
import {
  type IEmpresaFindOneQuery,
  IEmpresaFindOneQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import { EMPRESA_REPOSITORY_PORT, type IEmpresaRepositoryPort } from "../../../domain/repositories";
import type { EmpresaFindOneOutputDto } from "../../dtos";

@Injectable()
export class EmpresaFindOneQueryHandlerImpl implements IEmpresaFindOneQueryHandler {
  constructor(
    @Inject(EMPRESA_REPOSITORY_PORT)
    private readonly repository: IEmpresaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEmpresaFindOneQuery): Promise<EmpresaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
