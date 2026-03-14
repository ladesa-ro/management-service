import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type INivelFormacaoCreateCommand,
  INivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoRepository } from "../../../domain/repositories";
import type { NivelFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class NivelFormacaoCreateCommandHandlerImpl implements INivelFormacaoCreateCommandHandler {
  constructor(
    @Inject(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: INivelFormacaoCreateCommand): Promise<NivelFormacaoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("nivel_formacao:create", { dto });

    const domain = NivelFormacao.criar({ slug: dto.slug });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, NivelFormacao.entityName, id);

    return result;
  }
}
