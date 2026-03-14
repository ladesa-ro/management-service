import { InternalServerErrorException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEstagiarioCreateCommand,
  IEstagiarioCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioCreateCommandHandlerImpl implements IEstagiarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IEstagiarioCreateCommand): Promise<EstagiarioFindOneQueryResult> {
    try {
      return await this.repository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao criar estagiário");
    }
  }
}
