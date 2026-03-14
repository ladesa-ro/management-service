import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IModalidadeUpdateCommand,
  IModalidadeUpdateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import {
  type IModalidadeRepositoryPort,
  MODALIDADE_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { ModalidadeFindOneOutputDto } from "../../dtos";

@Injectable()
export class ModalidadeUpdateCommandHandlerImpl implements IModalidadeUpdateCommandHandler {
  constructor(
    @Inject(MODALIDADE_REPOSITORY_PORT)
    private readonly repository: IModalidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IModalidadeUpdateCommand): Promise<ModalidadeFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Modalidade", dto.id);
    }

    await this.authorizationService.ensurePermission("modalidade:update", { dto }, dto.id);

    const domain = Modalidade.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    await this.repository.updateFromDomain(current.id, { nome: domain.nome, slug: domain.slug });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Modalidade", dto.id);
    }

    return result;
  }
}
