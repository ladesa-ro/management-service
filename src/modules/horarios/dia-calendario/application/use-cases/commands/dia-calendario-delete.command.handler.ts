import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IDiaCalendarioDeleteCommand,
  IDiaCalendarioDeleteCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-delete.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.domain";
import { IDiaCalendarioRepository } from "../../../domain/repositories";

@Injectable()
export class DiaCalendarioDeleteCommandHandlerImpl implements IDiaCalendarioDeleteCommandHandler {
  constructor(
    @Inject(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IDiaCalendarioDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("dia_calendario:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, DiaCalendario.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
