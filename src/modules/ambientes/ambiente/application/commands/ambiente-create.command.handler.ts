import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type { AmbienteCreateCommand } from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command";
import { IAmbienteCreateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import type { AmbienteFindOneQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteCreateCommandHandlerImpl implements IAmbienteCreateCommandHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @DeclareDependency(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
    @DeclareDependency(IBlocoFindOneQueryHandler)
    private readonly blocoFindOneHandler: IBlocoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: AmbienteCreateCommand,
  ): Promise<AmbienteFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const bloco = await this.blocoFindOneHandler.execute(accessContext, { id: dto.bloco.id });
    ensureExists(bloco, Bloco.entityName, dto.bloco.id);

    const domain = Ambiente.create({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
      bloco: { id: bloco.id },
    });

    const { id } = await this.repository.create({ ...domain, bloco: { id: bloco.id } });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Ambiente.entityName, id);

    return result;
  }
}
