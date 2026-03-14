import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEmpresaDeleteCommand,
  IEmpresaDeleteCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import { EMPRESA_REPOSITORY_PORT, type IEmpresaRepositoryPort } from "../../../domain/repositories";

@Injectable()
export class EmpresaDeleteCommandHandlerImpl implements IEmpresaDeleteCommandHandler {
  constructor(
    @Inject(EMPRESA_REPOSITORY_PORT)
    private readonly repository: IEmpresaRepositoryPort,
  ) {}

  async execute({ accessContext, id }: IEmpresaDeleteCommand): Promise<void> {
    try {
      await this.repository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao deletar empresa");
    }
  }
}
