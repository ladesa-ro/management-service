import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagiarioCreateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { IEstagiarioCreateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioCreateCommandHandlerImpl implements IEstagiarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    const estagiario = Estagiario.create(dto);

    await this.repository.save(estagiario);

    const result = await this.repository.getFindOneQueryResult(accessContext, {
      id: estagiario.id,
    });
    ensureExists(result, Estagiario.entityName, estagiario.id);

    return result;
  }
}
