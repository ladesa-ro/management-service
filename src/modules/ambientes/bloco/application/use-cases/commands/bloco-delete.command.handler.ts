import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IBlocoDeleteCommand,
  IBlocoDeleteCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import { IBlocoRepository } from "../../../domain/repositories";

@Injectable()
export class BlocoDeleteCommandHandlerImpl implements IBlocoDeleteCommandHandler {
  constructor(
    @Inject(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IBlocoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("bloco:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, "Bloco", dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
