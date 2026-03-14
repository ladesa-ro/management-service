import { InternalServerErrorException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEmpresaCreateCommand,
  IEmpresaCreateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import type { EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaCreateCommandHandlerImpl implements IEmpresaCreateCommandHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute({ accessContext, dto }: IEmpresaCreateCommand): Promise<EmpresaFindOneQueryResult> {
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
