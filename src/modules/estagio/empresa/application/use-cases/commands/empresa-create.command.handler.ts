import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEmpresaCreateCommand,
  IEmpresaCreateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import { EMPRESA_REPOSITORY_PORT, type IEmpresaRepositoryPort } from "../../../domain/repositories";
import type { EmpresaFindOneOutputDto } from "../../dtos";

@Injectable()
export class EmpresaCreateCommandHandlerImpl implements IEmpresaCreateCommandHandler {
  constructor(
    @Inject(EMPRESA_REPOSITORY_PORT)
    private readonly repository: IEmpresaRepositoryPort,
  ) {}

  async execute({ accessContext, dto }: IEmpresaCreateCommand): Promise<EmpresaFindOneOutputDto> {
    try {
      return await this.repository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao criar empresa");
    }
  }
}
