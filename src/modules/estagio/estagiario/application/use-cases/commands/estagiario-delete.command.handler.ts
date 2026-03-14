import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEstagiarioDeleteCommand,
  IEstagiarioDeleteCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import { IEstagiarioRepository } from "../../../domain/repositories";

@Injectable()
export class EstagiarioDeleteCommandHandlerImpl implements IEstagiarioDeleteCommandHandler {
  constructor(
    @Inject(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({ accessContext, id }: IEstagiarioDeleteCommand): Promise<void> {
    try {
      await this.repository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao deletar estagiário");
    }
  }
}
