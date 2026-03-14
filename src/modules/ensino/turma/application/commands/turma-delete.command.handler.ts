import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type ITurmaDeleteCommand,
  ITurmaDeleteCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import { ITurmaRepository } from "../../domain/repositories";

@Injectable()
export class TurmaDeleteCommandHandlerImpl implements ITurmaDeleteCommandHandler {
  constructor(
    @Inject(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: ITurmaDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("turma:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Turma.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
