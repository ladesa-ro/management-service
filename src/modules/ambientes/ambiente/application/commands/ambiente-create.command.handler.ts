import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteCreateCommand,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import { IAmbienteRepository } from "../../domain/repositories";
import type { AmbienteFindOneOutputDto } from "../dtos";

@Injectable()
export class AmbienteCreateCommandHandlerImpl implements IAmbienteCreateCommandHandler {
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IBlocoFindOneQueryHandler)
    private readonly blocoFindOneHandler: IBlocoFindOneQueryHandler,
  ) {}

  async execute({ accessContext, dto }: IAmbienteCreateCommand): Promise<AmbienteFindOneOutputDto> {
    await this.authorizationService.ensurePermission("ambiente:create", { dto });

    const bloco = await this.blocoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.bloco.id },
    });
    ensureExists(bloco, Bloco.entityName, dto.bloco.id);

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

    ensureExists(result, Ambiente.entityName, id);

    return result;
  }
}
