import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDisciplinaUpdateCommand,
  IDisciplinaUpdateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import type { DisciplinaFindOneOutputDto } from "../../dtos";
import { DISCIPLINA_REPOSITORY_PORT, type IDisciplinaRepositoryPort } from "../../ports";

@Injectable()
export class DisciplinaUpdateCommandHandlerImpl implements IDisciplinaUpdateCommandHandler {
  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    private readonly repository: IDisciplinaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDisciplinaUpdateCommand): Promise<DisciplinaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Disciplina", dto.id);
    }

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

    if (!result) {
      throw new ResourceNotFoundError("Disciplina", dto.id);
    }

    return result;
  }
}
