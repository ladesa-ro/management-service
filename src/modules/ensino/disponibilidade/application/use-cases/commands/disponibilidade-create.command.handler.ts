import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDisponibilidadeCreateCommand,
  IDisponibilidadeCreateCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands/disponibilidade-create.command.handler.interface";
import { Disponibilidade } from "@/modules/ensino/disponibilidade/domain/disponibilidade.domain";
import type { DisponibilidadeFindOneOutputDto } from "../../dtos";
import { DISPONIBILIDADE_REPOSITORY_PORT, type IDisponibilidadeRepositoryPort } from "../../ports";

@Injectable()
export class DisponibilidadeCreateCommandHandlerImpl
  implements IDisponibilidadeCreateCommandHandler
{
  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IDisponibilidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDisponibilidadeCreateCommand): Promise<DisponibilidadeFindOneOutputDto> {
    await this.authorizationService.ensurePermission("disponibilidade:create", { dto });

    const domain = Disponibilidade.criar({ dataInicio: dto.dataInicio, dataFim: dto.dataFim });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Disponibilidade", id);
    }

    return result;
  }
}
