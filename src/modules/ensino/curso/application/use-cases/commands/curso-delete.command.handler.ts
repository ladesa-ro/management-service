import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type ICursoDeleteCommand,
  ICursoDeleteCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { ICursoRepository } from "../../../domain/repositories";

@Injectable()
export class CursoDeleteCommandHandlerImpl implements ICursoDeleteCommandHandler {
  constructor(
    @Inject(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: ICursoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("curso:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Curso.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
