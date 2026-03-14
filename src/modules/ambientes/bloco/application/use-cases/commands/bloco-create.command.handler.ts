import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import {
  type IBlocoCreateCommand,
  IBlocoCreateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import { CampusService } from "@/modules/ambientes/campus";
import type { BlocoFindOneOutputDto } from "../../dtos";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../ports";

@Injectable()
export class BlocoCreateCommandHandlerImpl implements IBlocoCreateCommandHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly campusService: CampusService,
  ) {}

  async execute({ accessContext, dto }: IBlocoCreateCommand): Promise<BlocoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("bloco:create", { dto });

    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    const domain = Bloco.criar({
      nome: dto.nome,
      codigo: dto.codigo,
      campus: { id: campus.id },
    });
    const { id } = await this.repository.createFromDomain({ ...domain, campus: { id: campus.id } });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Bloco", id);
    }

    return result;
  }
}
