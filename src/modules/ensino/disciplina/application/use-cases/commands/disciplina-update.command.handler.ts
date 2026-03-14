import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IDisciplinaUpdateCommand,
  IDisciplinaUpdateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaRepository } from "../../../domain/repositories";
import type { DisciplinaFindOneOutputDto } from "../../dtos";

@Injectable()
export class DisciplinaUpdateCommandHandlerImpl implements IDisciplinaUpdateCommandHandler {
  constructor(
    @Inject(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDisciplinaUpdateCommand): Promise<DisciplinaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Disciplina.entityName, dto.id);

    await this.authorizationService.ensurePermission("disciplina:update", { dto }, dto.id);

    const domain = Disciplina.fromData(current);
    domain.atualizar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    await this.repository.updateFromDomain(current.id, {
      nome: domain.nome,
      nomeAbreviado: domain.nomeAbreviado,
      cargaHoraria: domain.cargaHoraria,
    });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Disciplina.entityName, dto.id);

    return result;
  }
}
