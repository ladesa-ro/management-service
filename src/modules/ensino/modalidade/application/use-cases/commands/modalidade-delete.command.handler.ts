import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IModalidadeDeleteCommand,
  IModalidadeDeleteCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadeRepository } from "../../../domain/repositories";

@Injectable()
export class ModalidadeDeleteCommandHandlerImpl implements IModalidadeDeleteCommandHandler {
  constructor(
    @Inject(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IModalidadeDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("modalidade:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Modalidade.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
