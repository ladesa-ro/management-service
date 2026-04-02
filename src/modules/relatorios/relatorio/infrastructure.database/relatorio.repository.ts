import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { DiarioProfessorEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-professor.typeorm.entity";
import type {
  IAulasMinistradas,
  IAulasMinistradasQuery,
  IRelatorioRepository,
} from "../domain/repositories";

/** Represents the hydrated shape of DiarioProfessorEntity after leftJoinAndSelect of nested relations. */
interface HydratedDiarioProfessor {
  id: string;
  diario?: {
    id: string;
    ativo: boolean;
    disciplina?: { id: string; nome: string };
    turma?: {
      id: string;
      nome: string | null;
      periodo: string;
      curso?: { id: string; nome: string };
    };
    calendarioLetivo?: { id: string; nome: string; ano: number };
  };
  perfil?: {
    id: string;
    usuario?: { nome: string | null };
  };
}

// cross-module: uses TypeORM directly for join query (DiarioProfessorEntity - diario module has no repository to inject)
@Impl()
export class RelatorioTypeOrmRepositoryAdapter implements IRelatorioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
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

    return entries.map((rawDp) => {
      const dp = rawDp as unknown as HydratedDiarioProfessor;
      const diario = dp.diario;
      return {
        diarioId: diario?.id,
        professorNome: dp.perfil?.usuario?.nome ?? null,
        perfilId: dp.perfil?.id ?? null,
        disciplinaNome: diario?.disciplina?.nome ?? null,
        disciplinaId: diario?.disciplina?.id ?? null,
        turmaPeriodo: diario?.turma?.periodo ?? null,
        turmaNome: diario?.turma?.nome ?? null,
        turmaId: diario?.turma?.id ?? null,
        cursoNome: diario?.turma?.curso?.nome ?? null,
        cursoId: diario?.turma?.curso?.id ?? null,
        calendarioLetivoNome: diario?.calendarioLetivo?.nome ?? null,
        calendarioLetivoAno: diario?.calendarioLetivo?.ano ?? null,
        ativo: diario?.ativo ?? false,
      };
    });
  }
}
