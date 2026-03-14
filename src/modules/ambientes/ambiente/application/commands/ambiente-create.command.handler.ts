import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteCreateCommand,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
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

  async execute({
    accessContext,
    dto,
  }: IAmbienteCreateCommand): Promise<AmbienteFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

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
