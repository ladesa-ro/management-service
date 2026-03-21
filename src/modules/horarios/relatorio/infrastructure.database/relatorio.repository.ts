import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { DiarioProfessorEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-professor.typeorm.entity";
import type {
  IAulasMinistradas,
  IAulasMinistradasQuery,
  IRelatorioRepository,
} from "../domain/repositories";

// cross-module: uses TypeORM directly for join query (DiarioProfessorEntity - diario module has no repository to inject)
@DeclareImplementation()
export class RelatorioTypeOrmRepositoryAdapter implements IRelatorioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findAulasMinistradas(query: IAulasMinistradasQuery): Promise<IAulasMinistradas[]> {
    const qb = this.appTypeormConnection
      .getRepository(DiarioProfessorEntity)
      .createQueryBuilder("dp")
      .leftJoinAndSelect("dp.diario", "diario")
      .leftJoinAndSelect("dp.perfil", "perfil")
      .leftJoinAndSelect("perfil.usuario", "usuario")
      .leftJoinAndSelect("diario.disciplina", "disciplina")
      .leftJoinAndSelect("diario.turma", "turma")
      .leftJoinAndSelect("turma.curso", "curso")
      .leftJoinAndSelect("diario.calendarioLetivo", "calendarioLetivo")
      .where("dp.date_deleted IS NULL")
      .andWhere("diario.date_deleted IS NULL")
      .andWhere("diario.ativo = true");

    if (query.perfilId) {
      qb.andWhere("dp.id_perfil_fk = :perfilId", { perfilId: query.perfilId });
    }
    if (query.turmaId) {
      qb.andWhere("diario.id_turma_fk = :turmaId", { turmaId: query.turmaId });
    }
    if (query.disciplinaId) {
      qb.andWhere("diario.id_disciplina_fk = :disciplinaId", { disciplinaId: query.disciplinaId });
    }
    if (query.cursoId) {
      qb.andWhere("turma.id_curso_fk = :cursoId", { cursoId: query.cursoId });
    }
    if (query.periodo) {
      qb.andWhere("turma.periodo = :periodo", { periodo: query.periodo });
    }

    const entries = await qb.getMany();

    return entries.map((dp) => {
      const diario = dp.diario;
      return {
        diarioId: diario?.id,
        professorNome: (dp.perfil as any)?.usuario?.nome ?? null,
        perfilId: (dp.perfil as any)?.id ?? null,
        disciplinaNome: (diario?.disciplina as any)?.nome ?? null,
        disciplinaId: (diario?.disciplina as any)?.id ?? null,
        turmaPeriodo: (diario?.turma as any)?.periodo ?? null,
        turmaNome: (diario?.turma as any)?.nome ?? null,
        turmaId: (diario?.turma as any)?.id ?? null,
        cursoNome: (diario?.turma as any)?.curso?.nome ?? null,
        cursoId: (diario?.turma as any)?.curso?.id ?? null,
        calendarioLetivoNome: (diario?.calendarioLetivo as any)?.nome ?? null,
        calendarioLetivoAno: (diario?.calendarioLetivo as any)?.ano ?? null,
        ativo: diario?.ativo ?? false,
      };
    });
  }
}
