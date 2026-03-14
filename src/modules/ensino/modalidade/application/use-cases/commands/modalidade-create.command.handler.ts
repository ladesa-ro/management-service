import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IModalidadeCreateCommand,
  IModalidadeCreateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import type { ModalidadeFindOneOutputDto } from "../../dtos";
import { type IModalidadeRepositoryPort, MODALIDADE_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ModalidadeCreateCommandHandlerImpl implements IModalidadeCreateCommandHandler {
  constructor(
    @Inject(MODALIDADE_REPOSITORY_PORT)
    private readonly repository: IModalidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IModalidadeCreateCommand): Promise<ModalidadeFindOneOutputDto> {
    await this.authorizationService.ensurePermission("modalidade:create", { dto });

    const domain = Modalidade.criar({ nome: dto.nome, slug: dto.slug });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Modalidade", id);
    }

    return result;
  }
}
