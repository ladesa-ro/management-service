import { DataSource, EntityManager } from "typeorm";
import * as repositories from "../typeorm/repositories";

export class DatabaseContext {
  constructor(readonly ds: DataSource | EntityManager) {}

  //

  get dataSource() {
    if (this.ds instanceof DataSource) {
      return this.ds;
    }

    return this.ds.connection;
  }

  get entityManager() {
    if (this.ds instanceof EntityManager) {
      return this.ds;
    }

    return this.ds.manager;
  }

  async transaction<T>(callback: (context: { databaseContext: DatabaseContext }) => T | Promise<T>): Promise<T> {
    return this.ds.transaction(async (entityManager) => {
      const databaseContextForTransaction = new DatabaseContext(entityManager);
      return callback({ databaseContext: databaseContextForTransaction });
    });
  }

  async startTransaction() {
    const transactionManager = {
      finished: false,
      transactionPromise: {} as Promise<void>,
      databaseContext: {} as DatabaseContext,
      commit: {} as () => Promise<void>,
      rollback: {} as () => Promise<void>,
    };

    transactionManager.transactionPromise = this.transaction((ds) => {
      transactionManager.databaseContext = ds.databaseContext;

      return new Promise<void>((resolve, reject) => {
        transactionManager.commit = () => {
          if (!transactionManager.finished) {
            resolve();
          }

          return transactionManager.transactionPromise;
        };

        transactionManager.rollback = () => {
          if (!transactionManager.finished) {
            reject();
          }

          return transactionManager.transactionPromise.finally();
        };
      });
    });

    transactionManager.transactionPromise.finally();

    return transactionManager;
  }

  //

  // =====================================================
  // == [ BASE ] =========================================
  // =====================================================

  get arquivoRepository() {
    return repositories.createArquivoRepository(this.ds);
  }

  get imagemRepository() {
    return repositories.createImagemRepository(this.ds);
  }

  get imagemArquivoRepository() {
    return repositories.createImagemArquivoRepository(this.ds);
  }

  get intervaloDeTempoRepository() {
    return repositories.createIntervaloDeTempoRepository(this.ds);
  }

  //

  // =====================================================
  // == [ BASE / LUGARES ] ===============================
  // =====================================================

  get estadoRepository() {
    return repositories.createEstadoRepository(this.ds);
  }

  get cidadeRepository() {
    return repositories.createCidadeRepository(this.ds);
  }

  get enderecoRepository() {
    return repositories.createEnderecoRepository(this.ds);
  }

  // =====================================================
  // == [ AUTENTICAÇÃO ] =================================
  // =====================================================

  get usuarioRepository() {
    return repositories.createUsuarioRepository(this.ds);
  }

  // =====================================================
  // == [ AMBIENTES ] ====================================
  // =====================================================

  get campusRepository() {
    return repositories.createCampusRepository(this.ds);
  }

  get blocoRepository() {
    return repositories.createBlocoRepository(this.ds);
  }

  get ambienteRepository() {
    return repositories.createAmbienteRepository(this.ds);
  }

  get reservaRepository() {
    return repositories.createReservaRepository(this.ds);
  }

  // =====================================================
  // == [ AUTORIZAÇÃO ] ==================================
  // =====================================================

  get perfilRepository() {
    return repositories.createPerfilRepository(this.ds).extend({});
  }

  // =====================================================
  // == [ Ensino / Institucional ] =======================
  // =====================================================

  get nivelFormacaoRepository() {
    return repositories.createNivelFormacaoRepository(this.ds);
  }

  get modalidadeRepository() {
    return repositories.createModalidadeRepository(this.ds);
  }

  get ofertaFormacaoRepository() {
    return repositories.createOfertaFormacaoRepository(this.ds);
  }

  get ofertaFormacaoNivelFormacaoRepository() {
    return repositories.createOfertaFormacaoNivelFormacaoRepository(this.ds);
  }

  get cursoRepository() {
    return repositories.createCursoRepository(this.ds);
  }

  get disciplinaRepository() {
    return repositories.createDisciplinaRepository(this.ds);
  }

  // =====================================================
  // == [ Calendario ] =======================================
  // =====================================================

  get calendarioLetivoRepository() {
    return repositories.createCalendarioLetivoRepository(this.ds);
  }

  get gradeHorarioOfertaFormacaoRepository() {
    return repositories.createGradeHorarioOfertaFormacaoRepository(this.ds);
  }

  get gradeHorarioOfertaFormacaoIntervaloDeTempoRepository() {
    return repositories.createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository(this.ds);
  }

  get diaCalendarioRepository() {
    return repositories.createDiaCalendarioRepository(this.ds);
  }

  get etapaRepository() {
    return repositories.createEtapaRepository(this.ds);
  }

  get eventoRepository() {
    return repositories.createEventoRepository(this.ds);
  }

  // =====================================================

  // =====================================================
  // == [ Ensino Discente ] ==============================
  // =====================================================

  get turmaRepository() {
    return repositories.createTurmaRepository(this.ds);
  }

  get diarioRepository() {
    return repositories.createDiarioRepository(this.ds);
  }

  get diarioProfessorRepository() {
    return repositories.createDiarioProfessorRepository(this.ds);
  }

  get aulaRepository() {
    return repositories.createAulaRepository(this.ds);
  }

  // =====================================================
  // == [ Horario Academico ] ============================
  // =====================================================

  get disponibilidadeRepository() {
    return repositories.createDisponibilidadeRepository(this.ds);
  }

  get disponibilidadeDiaRepository() {
    return repositories.createDisponibilidadeDiaRepository(this.ds);
  }

  get turmaDisponibilidadeRepository() {
    return repositories.createTurmaDisponibilidadeRepository(this.ds);
  }

  get professorDisponibilidadeRepository() {
    return repositories.createProfessorDisponibilidadeRepository(this.ds);
  }

  get diarioPreferenciaAgrupamentoRepository() {
    return repositories.createDiarioPreferenciaAgrupamentoRepository(this.ds);
  }

  get horarioGeradoRepository() {
    return repositories.createHorarioGeradoRepository(this.ds);
  }

  get horarioGeradoAulaRepository() {
    return repositories.createHorarioGeradoAulaRepository(this.ds);
  }
}
