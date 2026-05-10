import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { EstagioCreateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-create.command";
import { IEstagioCreateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioCreateCommandHandlerImpl implements IEstagioCreateCommandHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioCreateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    if (process.env.DEBUG_CSV_IMPORT) {
      console.log("[CSV import][handler] dto recebido para criar estagio", { dto });
    }

    const estagio = Estagio.create(dto);

    if (process.env.DEBUG_CSV_IMPORT) {
      console.log("[CSV import][handler] aggregate antes do save", {
        id: estagio.id,
        estagiario: estagio.estagiario,
        empresa: estagio.empresa,
      });
    }

    await this.repository.save(estagio);

    if (process.env.DEBUG_CSV_IMPORT) {
      console.log("[CSV import][handler] aggregate salvo (após save)", {
        id: estagio.id,
        estagiario: estagio.estagiario,
      });
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, {
      id: estagio.id,
    });
    ensureExists(result, Estagio.entityName, estagio.id);

    return result;
  }
}
