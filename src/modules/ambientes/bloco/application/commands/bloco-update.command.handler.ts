import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import {
  type IBlocoUpdateCommand,
  IBlocoUpdateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import { IBlocoRepository } from "../../domain/repositories";
import type { BlocoFindOneOutputDto } from "../dtos";

@Injectable()
export class BlocoUpdateCommandHandlerImpl implements IBlocoUpdateCommandHandler {
  constructor(
    @Inject(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @Inject(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: IBlocoUpdateCommand): Promise<BlocoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Bloco.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Bloco.fromData(current);
    domain.atualizar({ nome: dto.nome, codigo: dto.codigo });
    await this.repository.updateFromDomain(current.id, {
      nome: domain.nome,
      codigo: domain.codigo,
    });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Bloco.entityName, dto.id);

    return result;
  }
}
