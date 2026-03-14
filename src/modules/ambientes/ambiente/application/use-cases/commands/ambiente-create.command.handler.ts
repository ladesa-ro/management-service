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
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
} from "../../../domain/repositories";
import type { AmbienteFindOneOutputDto } from "../../dtos";

@Injectable()
export class AmbienteCreateCommandHandlerImpl implements IAmbienteCreateCommandHandler {
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IBlocoFindOneQueryHandler)
    private readonly blocoFindOneHandler: IBlocoFindOneQueryHandler,
  ) {}

  async execute({ accessContext, dto }: IAmbienteCreateCommand): Promise<AmbienteFindOneOutputDto> {
    await this.authorizationService.ensurePermission("ambiente:create", { dto });

    const bloco = await this.blocoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.bloco.id },
    });
    if (!bloco) {
      throw new ResourceNotFoundError("Bloco", dto.bloco.id);
    }

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
