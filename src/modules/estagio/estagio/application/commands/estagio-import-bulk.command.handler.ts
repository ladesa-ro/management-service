import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IUsuarioRepository } from "@/modules/acesso/usuario/domain/repositories";
import type { EstagioImportBulkCommand } from "@/modules/estagio/estagio/domain/commands/estagio-import-bulk.command";
import {
  type EstagioImportBulkResult,
  type EstagioImportBulkResultItem,
  IEstagioImportBulkCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-import-bulk.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";

@Impl()
export class EstagioImportBulkCommandHandlerImpl implements IEstagioImportBulkCommandHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly estágioRepository: IEstagioRepository,
    @Dep(IUsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioImportBulkCommand,
  ): Promise<EstagioImportBulkResult> {
    const results: EstagioImportBulkResultItem[] = [];
    let created = 0;
    const skipped = 0;
    let failed = 0;

    for (let index = 0; index < dto.items.length; index += 1) {
      const item = dto.items[index];
      const lineNumber = index + 1;

      try {
        // 1. Validar se usuário com a matrícula existe
        const usuarioExistente = await this.usuarioRepository.findByMatricula(
          item.matriculaEstagiario,
        );

        if (!usuarioExistente) {
          results.push({
            line: lineNumber,
            matriculaEstagiario: item.matriculaEstagiario,
            nomeEstagiario: item.nomeEstagiario,
            status: "failed",
            reason: `Usuário com matrícula ${item.matriculaEstagiario} não encontrado no sistema`,
          });
          failed += 1;
          continue;
        }

        // 2. Criar estágio (Nota: estagiário é fornecido via empresaId)
        const novoEstagio = Estagio.create({
          empresa: { id: item.empresaId },
          estagiario: null, // opcional - será preenchido depois
          usuarioOrientador: { id: usuarioExistente.id },
          cargaHoraria: item.cargaHoraria,
          dataInicio: item.dataInicio,
          dataFim: item.dataFim,
          nomeSupervisor: item.nomeSupervisor,
          emailSupervisor: item.emailSupervisor,
          telefoneSupervisor: item.telefoneSupervisor,
        });

        await this.estágioRepository.save(novoEstagio);

        results.push({
          line: lineNumber,
          matriculaEstagiario: item.matriculaEstagiario,
          nomeEstagiario: item.nomeEstagiario,
          status: "created",
          estágioId: novoEstagio.id,
        });
        created += 1;
      } catch (error) {
        results.push({
          line: lineNumber,
          matriculaEstagiario: item.matriculaEstagiario,
          nomeEstagiario: item.nomeEstagiario,
          status: "failed",
          reason:
            error instanceof Error ? error.message : "Erro desconhecido ao processar registro",
        });
        failed += 1;
      }
    }

    return {
      total: dto.items.length,
      created,
      skipped,
      failed,
      items: results,
    };
  }
}
