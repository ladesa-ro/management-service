import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IModalidadeUpdateCommand,
  IModalidadeUpdateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadeRepository } from "../../domain/repositories";
import type { ModalidadeFindOneOutputDto } from "../dtos";

@Injectable()
export class ModalidadeUpdateCommandHandlerImpl implements IModalidadeUpdateCommandHandler {
  constructor(
    @Inject(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IModalidadeUpdateCommand): Promise<ModalidadeFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Modalidade.entityName, dto.id);

    await this.authorizationService.ensurePermission("modalidade:update", { dto }, dto.id);

    const domain = Modalidade.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    await this.repository.updateFromDomain(current.id, { nome: domain.nome, slug: domain.slug });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Modalidade.entityName, dto.id);

    return result;
  }
}
