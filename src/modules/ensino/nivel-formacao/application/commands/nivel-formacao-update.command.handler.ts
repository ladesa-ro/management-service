import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type INivelFormacaoUpdateCommand,
  INivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoPermissionChecker } from "../../domain/authorization";
import { INivelFormacaoRepository } from "../../domain/repositories";
import type { NivelFormacaoFindOneOutputDto } from "../dtos";

@Injectable()
export class NivelFormacaoUpdateCommandHandlerImpl implements INivelFormacaoUpdateCommandHandler {
  constructor(
    @Inject(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @Inject(INivelFormacaoPermissionChecker)
    private readonly permissionChecker: INivelFormacaoPermissionChecker,
  ) {}

  async execute({
    accessContext,
    dto,
  }: INivelFormacaoUpdateCommand): Promise<NivelFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, NivelFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = NivelFormacao.fromData(current);
    domain.atualizar({ slug: dto.slug });
    await this.repository.updateFromDomain(current.id, { slug: domain.slug });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, NivelFormacao.entityName, dto.id);

    return result;
  }
}
