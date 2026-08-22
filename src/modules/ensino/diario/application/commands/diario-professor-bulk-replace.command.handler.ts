import { BadRequestException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { DiarioProfessorBulkReplaceCommand } from "../../domain/commands/diario-professor-bulk-replace.command";
import { IDiarioProfessorBulkReplaceCommandHandler } from "../../domain/commands/diario-professor-bulk-replace.command.handler.interface";
import type {
  DiarioProfessorListQuery,
  DiarioProfessorListQueryResult,
} from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@Impl()
export class DiarioProfessorBulkReplaceCommandHandlerImpl
  implements IDiarioProfessorBulkReplaceCommandHandler
{
  constructor(
    @Dep(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
    @Dep(IPerfilFindOneQueryHandler)
    private readonly perfilFindOneHandler: IPerfilFindOneQueryHandler,
    @Dep(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioProfessorBulkReplaceCommand,
  ): Promise<DiarioProfessorListQueryResult> {
    await this.ensureCargaMaximaSemanalNaoExcedida(accessContext, dto);

    await this.repository.softDeleteByDiarioId(dto.diarioId);

    await this.repository.bulkCreate(
      dto.professores.map((p) => ({
        situacao: p.situacao,
        diarioId: dto.diarioId,
        perfilId: p.perfilId,
      })),
    );

    const listQuery: DiarioProfessorListQuery = { "filter.diario.id": [dto.diarioId] };
    return this.repository.getFindAllQueryResult(accessContext, listQuery);
  }

  private async ensureCargaMaximaSemanalNaoExcedida(
    accessContext: IAccessContext | null,
    dto: DiarioProfessorBulkReplaceCommand,
  ): Promise<void> {
    const perfilIdsAtivos = [
      ...new Set(dto.professores.filter((p) => p.situacao).map((p) => p.perfilId)),
    ];

    if (perfilIdsAtivos.length === 0) return;

    const diarioAtual = await this.diarioFindOneHandler.execute(accessContext, {
      id: dto.diarioId,
    });
    const cargaHorariaDiarioAtual = diarioAtual?.disciplina.cargaHoraria ?? 0;

    const excedentes: Array<{ perfilId: string; total: number; maximo: number }> = [];

    for (const perfilId of perfilIdsAtivos) {
      const perfil = await this.perfilFindOneHandler.execute(accessContext, { id: perfilId });

      if (!perfil || perfil.cargaMaximaSemanal === null) continue;

      const vinculosAtivos = await this.repository.findAllActiveByPerfilId(perfilId);

      const cargaHorariaOutrosDiarios = vinculosAtivos
        .filter((v) => v.diarioId !== dto.diarioId)
        .reduce((total, v) => total + v.cargaHoraria, 0);

      const total = cargaHorariaOutrosDiarios + cargaHorariaDiarioAtual;

      if (total > perfil.cargaMaximaSemanal) {
        excedentes.push({ perfilId, total, maximo: perfil.cargaMaximaSemanal });
      }
    }

    if (excedentes.length > 0) {
      const descricoes = excedentes.map(
        (e) => `perfil ${e.perfilId} ficaria com ${e.total}h (máximo permitido: ${e.maximo}h)`,
      );
      throw new BadRequestException(
        `Carga horária semanal máxima excedida. Os seguintes professores ultrapassariam seu limite: ${descricoes.join("; ")}.`,
      );
    }
  }
}
