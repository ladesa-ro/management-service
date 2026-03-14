import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type INivelFormacaoDeleteCommand,
  INivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoRepository } from "../../domain/repositories";

@Injectable()
export class NivelFormacaoDeleteCommandHandlerImpl implements INivelFormacaoDeleteCommandHandler {
  constructor(
    @Inject(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: INivelFormacaoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("nivel_formacao:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, NivelFormacao.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
