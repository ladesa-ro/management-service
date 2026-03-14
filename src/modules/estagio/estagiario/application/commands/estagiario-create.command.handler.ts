import { InternalServerErrorException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEstagiarioCreateCommand,
  IEstagiarioCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import { IEstagiarioRepository } from "../../domain/repositories";
import type { EstagiarioFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class EstagiarioCreateCommandHandlerImpl implements IEstagiarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IEstagiarioCreateCommand): Promise<EstagiarioFindOneOutputDto> {
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
