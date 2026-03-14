import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteCreateCommand,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import { BlocoService } from "@/modules/ambientes/bloco/application/use-cases/bloco.service";
import type { AmbienteFindOneOutputDto } from "../../dtos";
import { AMBIENTE_REPOSITORY_PORT, type IAmbienteRepositoryPort } from "../../ports";

@Injectable()
export class AmbienteCreateCommandHandlerImpl implements IAmbienteCreateCommandHandler {
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly blocoService: BlocoService,
  ) {}

  async execute({ accessContext, dto }: IAmbienteCreateCommand): Promise<AmbienteFindOneOutputDto> {
    await this.authorizationService.ensurePermission("ambiente:create", { dto });

    const bloco = await this.blocoService.findByIdSimpleStrict(accessContext, dto.bloco.id);

    const domain = Ambiente.criar({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
      bloco: { id: bloco.id },
    });

    const { id } = await this.repository.createFromDomain({ ...domain, bloco: { id: bloco.id } });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Ambiente", id);
    }

    return result;
  }
}
