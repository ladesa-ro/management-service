import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IDisciplinaCreateCommand,
  IDisciplinaCreateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaRepository } from "../../../domain/repositories";
import type { DisciplinaFindOneOutputDto } from "../../dtos";

@Injectable()
export class DisciplinaCreateCommandHandlerImpl implements IDisciplinaCreateCommandHandler {
  constructor(
    @Inject(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDisciplinaCreateCommand): Promise<DisciplinaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("disciplina:create", { dto });

    const domain = Disciplina.criar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Disciplina.entityName, id);

    return result;
  }
}
