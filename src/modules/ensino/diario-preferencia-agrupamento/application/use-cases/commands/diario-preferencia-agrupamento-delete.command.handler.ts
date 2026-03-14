import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDiarioPreferenciaAgrupamentoDeleteCommand,
  IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../../../domain/repositories";

@Injectable()
export class DiarioPreferenciaAgrupamentoDeleteCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoDeleteCommandHandler
{
  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioPreferenciaAgrupamentoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission(
      "diario_preferencia_agrupamento:delete",
      { dto },
      dto.id,
    );

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
