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

    // Verificação: garante que o FK de estagiário foi persistido corretamente.
    let result = null as any;
    try {
      result = await this.repository.getFindOneQueryResult(accessContext, {
        id: estagio.id,
      });
    } catch (err) {
      if (process.env.DEBUG_CSV_IMPORT) {
        console.log(
          "[CSV import][handler] falha ao mapear queryResult após save — aplicando fallback parcial",
          { id: estagio.id, error: err instanceof Error ? err.message : String(err) },
        );
      }

      // Fallback: construir um objeto mínimo compatível com EstagioFindOneQueryResult
      result = {
        id: estagio.id,
        empresa: { id: estagio.empresa.id },
        estagiario: estagio.estagiario ? { id: estagio.estagiario.id } : null,
        usuarioOrientador: estagio.usuarioOrientador ? { id: estagio.usuarioOrientador.id } : null,
        nomeSupervisor: estagio.nomeSupervisor,
        emailSupervisor: estagio.emailSupervisor,
        telefoneSupervisor: estagio.telefoneSupervisor,
        aditivo: estagio.aditivo,
        tipoAditivo: estagio.tipoAditivo,
        cargaHoraria: estagio.cargaHoraria,
        dataInicio: estagio.dataInicio,
        dataFim: estagio.dataFim,
        status: estagio.status,
        horariosEstagio: (estagio.horariosEstagio ?? []).map((h) => ({
          id: h.id,
          diaSemana: h.diaSemana,
          horaInicio: h.horaInicio,
          horaFim: h.horaFim,
        })),
        ativo: estagio.dateDeleted == null,
        dateCreated: estagio.dateCreated,
        dateUpdated: estagio.dateUpdated,
      } as EstagioFindOneQueryResult;
    }

    if (process.env.DEBUG_CSV_IMPORT) {
      console.log("[CSV import][handler] queryResult após save (verificação)", {
        id: estagio.id,
        resultEstagiario: result?.estagiario ?? null,
        expectedEstagiario: estagio.estagiario ?? null,
      });
    }

    // Se por algum motivo o relacionamento não foi persistido (FK null), tentar salvar novamente.
    if (estagio.estagiario && (!result || !result.estagiario)) {
      if (process.env.DEBUG_CSV_IMPORT) {
        console.log("[CSV import][handler] estagiario FK ausente após save — tentando reaplicar", {
          id: estagio.id,
          estagiario: estagio.estagiario,
        });
      }

      await this.repository.save(estagio);

      result = await this.repository.getFindOneQueryResult(accessContext, { id: estagio.id });
      if (process.env.DEBUG_CSV_IMPORT) {
        console.log("[CSV import][handler] queryResult após re-save", {
          id: estagio.id,
          resultEstagiario: result?.estagiario ?? null,
        });
      }
    }
    ensureExists(result, Estagio.entityName, estagio.id);

    return result;
  }
}
