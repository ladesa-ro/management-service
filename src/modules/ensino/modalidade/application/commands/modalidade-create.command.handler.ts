import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IModalidadeCreateCommand,
  IModalidadeCreateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadeRepository } from "../../domain/repositories";
import type { ModalidadeFindOneOutputDto } from "../dtos";

@Injectable()
export class ModalidadeCreateCommandHandlerImpl implements IModalidadeCreateCommandHandler {
  constructor(
    @Inject(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IModalidadeCreateCommand): Promise<ModalidadeFindOneOutputDto> {
    await this.authorizationService.ensurePermission("modalidade:create", { dto });

    const domain = Modalidade.criar({ nome: dto.nome, slug: dto.slug });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Modalidade.entityName, id);

    return result;
  }
}
