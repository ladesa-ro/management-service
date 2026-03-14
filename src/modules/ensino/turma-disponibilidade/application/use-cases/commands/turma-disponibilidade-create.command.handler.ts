import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { DisponibilidadeService } from "@/modules/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import {
  type ITurmaDisponibilidadeCreateCommand,
  ITurmaDisponibilidadeCreateCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands/turma-disponibilidade-create.command.handler.interface";
import type { ITurmaDisponibilidade } from "@/modules/ensino/turma-disponibilidade/domain/turma-disponibilidade.types";
import type { TurmaDisponibilidadeFindOneOutputDto } from "../../dtos";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class TurmaDisponibilidadeCreateCommandHandlerImpl
  implements ITurmaDisponibilidadeCreateCommandHandler
{
  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: ITurmaDisponibilidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly turmaService: TurmaService,
    private readonly disponibilidadeService: DisponibilidadeService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ITurmaDisponibilidadeCreateCommand): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    await this.authorizationService.ensurePermission("turma_disponibilidade:create", { dto });

    const createData: Partial<PersistInput<ITurmaDisponibilidade>> = {};
    if (dto.turma) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      createData.turma = { id: turma.id };
    }
    if (dto.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
        accessContext,
        dto.disponibilidade.id,
      );
      createData.disponibilidade = { id: disponibilidade.id };
    }
    const { id } = await this.repository.createFromDomain(createData as any);

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", id);
    }

    return result;
  }
}
