import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";
import { DiarioProfessorEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-professor.typeorm.entity";
import { getNowISO } from "@/utils/date";
import type { IDiarioConfigurarRepository } from "../domain/repositories";

// cross-module: uses TypeORM directly for DiarioEntity and DiarioProfessorEntity (diario module has no repository to inject)
@DeclareImplementation()
export class DiarioConfigurarTypeOrmRepositoryAdapter implements IDiarioConfigurarRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async createDiario(data: {
    id: string;
    ativo: boolean;
    turmaId: string;
    disciplinaId: string;
    calendarioLetivoId: string;
  }): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(DiarioEntity);
    const now = getNowISO();

    const diario = new DiarioEntity();
    diario.id = data.id;
    diario.ativo = data.ativo;
    diario.turma = { id: data.turmaId } as DiarioEntity["turma"];
    diario.disciplina = { id: data.disciplinaId } as DiarioEntity["disciplina"];
    diario.calendarioLetivo = { id: data.calendarioLetivoId } as DiarioEntity["calendarioLetivo"];
    diario.ambientePadrao = null;
    diario.imagemCapa = null;
    diario.dateCreated = now;
    diario.dateUpdated = now;
    diario.dateDeleted = null;

    await repo.save(diario);
  }

  async createDiarioProfessor(data: {
    id: string;
    situacao: boolean;
    diarioId: string;
    perfilId: string;
  }): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(DiarioProfessorEntity);
    const now = getNowISO();

    const dp = new DiarioProfessorEntity();
    dp.id = data.id;
    dp.situacao = data.situacao;
    dp.diario = { id: data.diarioId } as DiarioProfessorEntity["diario"];
    dp.perfil = { id: data.perfilId } as DiarioProfessorEntity["perfil"];
    dp.dateCreated = now;
    dp.dateUpdated = now;
    dp.dateDeleted = null;

    await repo.save(dp);
  }
}
