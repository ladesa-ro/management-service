import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEmpresaUpdateCommand,
  IEmpresaUpdateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import { EMPRESA_REPOSITORY_PORT, type IEmpresaRepositoryPort } from "../../../domain/repositories";
import type { EmpresaFindOneOutputDto } from "../../dtos";

@Injectable()
export class EmpresaUpdateCommandHandlerImpl implements IEmpresaUpdateCommandHandler {
  constructor(
    @Inject(EMPRESA_REPOSITORY_PORT)
    private readonly repository: IEmpresaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    id,
    dto,
  }: IEmpresaUpdateCommand): Promise<EmpresaFindOneOutputDto> {
    try {
      return await this.repository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao atualizar empresa");
    }
  }
}
