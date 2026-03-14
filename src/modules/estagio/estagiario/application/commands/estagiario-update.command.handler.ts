import { InternalServerErrorException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEstagiarioUpdateCommand,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { IEstagiarioRepository } from "../../domain/repositories";
import type { EstagiarioFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class EstagiarioUpdateCommandHandlerImpl implements IEstagiarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    id,
    dto,
  }: IEstagiarioUpdateCommand): Promise<EstagiarioFindOneOutputDto> {
    try {
      return await this.repository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao atualizar estagiário");
    }
  }
}
