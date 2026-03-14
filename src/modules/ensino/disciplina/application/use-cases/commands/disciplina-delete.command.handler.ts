import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IDisciplinaDeleteCommand,
  IDisciplinaDeleteCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaRepository } from "../../../domain/repositories";

@Injectable()
export class DisciplinaDeleteCommandHandlerImpl implements IDisciplinaDeleteCommandHandler {
  constructor(
    @Inject(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IDisciplinaDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("disciplina:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Disciplina.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
