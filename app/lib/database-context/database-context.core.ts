import { DataSource, EntityManager } from "typeorm";
// Import directly from repository files to avoid circular dependencies with adapters
import { createAmbienteRepository } from "@/modules/ambiente/infrastructure/persistence/typeorm/ambiente.repository";
import { createArquivoRepository } from "@/modules/arquivo/infrastructure/persistence/typeorm/arquivo.repository";
import { createAulaRepository } from "@/modules/aula/infrastructure/persistence/typeorm/aula.repository";
import { createBlocoRepository } from "@/modules/bloco/infrastructure/persistence/typeorm/bloco.repository";
import { createCalendarioLetivoRepository } from "@/modules/calendario-letivo/infrastructure/persistence/typeorm/calendario-letivo.repository";
import { createCampusRepository } from "@/modules/campus/infrastructure/persistence/typeorm/campus.repository";
import { createCidadeRepository } from "@/modules/cidade/infrastructure/persistence/typeorm/cidade.repository";
import { createCursoRepository } from "@/modules/curso/infrastructure/persistence/typeorm/curso.repository";
import { createDiaCalendarioRepository } from "@/modules/dia-calendario/infrastructure/persistence/typeorm/dia-calendario.repository";
import { createDiarioRepository } from "@/modules/diario/infrastructure/persistence/typeorm/diario.repository";
import { createDiarioPreferenciaAgrupamentoRepository } from "@/modules/diario-preferencia-agrupamento/infrastructure/persistence/typeorm/diario-preferencia-agrupamento.repository";
import { createDiarioProfessorRepository } from "@/modules/diario-professor/infrastructure/persistence/typeorm/diario-professor.repository";
import { createDisciplinaRepository } from "@/modules/disciplina/infrastructure/persistence/typeorm/disciplina.repository";
import { createDisponibilidadeRepository } from "@/modules/disponibilidade/infrastructure/persistence/typeorm/disponibilidade.repository";
import { createEnderecoRepository } from "@/modules/endereco/infrastructure/persistence/typeorm/endereco.repository";
import { createEstadoRepository } from "@/modules/estado/infrastructure/persistence/typeorm/estado.repository";
import { createEtapaRepository } from "@/modules/etapa/infrastructure/persistence/typeorm/etapa.repository";
import { createEventoRepository } from "@/modules/evento/infrastructure/persistence/typeorm/evento.repository";
import { createGradeHorarioOfertaFormacaoRepository } from "@/modules/grade-horario-oferta-formacao/infrastructure/persistence/typeorm/grade-horario-oferta-formacao.repository";
import { createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm/grade-horario-oferta-formacao-intervalo-de-tempo.repository";
import { createHorarioGeradoRepository } from "@/modules/horario-gerado/infrastructure/persistence/typeorm/horario-gerado.repository";
import { createHorarioGeradoAulaRepository } from "@/modules/horario-gerado-aula/infrastructure/persistence/typeorm/horario-gerado-aula.repository";
import { createImagemRepository } from "@/modules/imagem/infrastructure/persistence/typeorm/imagem.repository";
import { createImagemArquivoRepository } from "@/modules/imagem-arquivo/infrastructure/persistence/typeorm/imagem-arquivo.repository";
import { createIntervaloDeTempoRepository } from "@/modules/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.repository";
import { createModalidadeRepository } from "@/modules/modalidade/infrastructure/persistence/typeorm/modalidade.repository";
import { createNivelFormacaoRepository } from "@/modules/nivel-formacao/infrastructure/persistence/typeorm/nivel-formacao.repository";
import { createOfertaFormacaoRepository } from "@/modules/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.repository";
import { createOfertaFormacaoNivelFormacaoRepository } from "@/modules/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm/oferta-formacao-nivel-formacao.repository";
import { createPerfilRepository } from "@/modules/perfil/infrastructure/persistence/typeorm/perfil.repository";
import { createProfessorIndisponibilidadeRepository } from "@/modules/professor-indisponibilidade/infrastructure/persistence/typeorm/professor-indisponibilidade.repository";
import { createReservaRepository } from "@/modules/reserva/infrastructure/persistence/typeorm/reserva.repository";
import { createTurmaRepository } from "@/modules/turma/infrastructure/persistence/typeorm/turma.repository";
import { createTurmaDisponibilidadeRepository } from "@/modules/turma-disponibilidade/infrastructure/persistence/typeorm/turma-disponibilidade.repository";
import { createUsuarioRepository } from "@/modules/usuario/infrastructure/persistence/typeorm/usuario.repository";

export class DatabaseContext {
  constructor(readonly ds: DataSource | EntityManager) {}

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

  get ambienteRepository() {
    return createAmbienteRepository(this.ds);
  }

  get arquivoRepository() {
    return createArquivoRepository(this.ds);
  }

  get aulaRepository() {
    return createAulaRepository(this.ds);
  }

  get blocoRepository() {
    return createBlocoRepository(this.ds);
  }

  get calendarioLetivoRepository() {
    return createCalendarioLetivoRepository(this.ds);
  }

  get campusRepository() {
    return createCampusRepository(this.ds);
  }

  get cidadeRepository() {
    return createCidadeRepository(this.ds);
  }

  get cursoRepository() {
    return createCursoRepository(this.ds);
  }

  get diaCalendarioRepository() {
    return createDiaCalendarioRepository(this.ds);
  }

  get diarioRepository() {
    return createDiarioRepository(this.ds);
  }

  get diarioPreferenciaAgrupamentoRepository() {
    return createDiarioPreferenciaAgrupamentoRepository(this.ds);
  }

  get diarioProfessorRepository() {
    return createDiarioProfessorRepository(this.ds);
  }

  get disciplinaRepository() {
    return createDisciplinaRepository(this.ds);
  }

  get disponibilidadeRepository() {
    return createDisponibilidadeRepository(this.ds);
  }

  get enderecoRepository() {
    return createEnderecoRepository(this.ds);
  }

  get estadoRepository() {
    return createEstadoRepository(this.ds);
  }

  get etapaRepository() {
    return createEtapaRepository(this.ds);
  }

  get eventoRepository() {
    return createEventoRepository(this.ds);
  }

  get gradeHorarioOfertaFormacaoRepository() {
    return createGradeHorarioOfertaFormacaoRepository(this.ds);
  }

  get gradeHorarioOfertaFormacaoIntervaloDeTempoRepository() {
    return createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository(this.ds);
  }

  get horarioGeradoRepository() {
    return createHorarioGeradoRepository(this.ds);
  }

  get horarioGeradoAulaRepository() {
    return createHorarioGeradoAulaRepository(this.ds);
  }

  get imagemRepository() {
    return createImagemRepository(this.ds);
  }

  get imagemArquivoRepository() {
    return createImagemArquivoRepository(this.ds);
  }

  get intervaloDeTempoRepository() {
    return createIntervaloDeTempoRepository(this.ds);
  }

  get modalidadeRepository() {
    return createModalidadeRepository(this.ds);
  }

  get nivelFormacaoRepository() {
    return createNivelFormacaoRepository(this.ds);
  }

  get ofertaFormacaoRepository() {
    return createOfertaFormacaoRepository(this.ds);
  }

  get ofertaFormacaoNivelFormacaoRepository() {
    return createOfertaFormacaoNivelFormacaoRepository(this.ds);
  }

  get perfilRepository() {
    return createPerfilRepository(this.ds);
  }

  get professorIndisponibilidadeRepository() {
    return createProfessorIndisponibilidadeRepository(this.ds);
  }

  get reservaRepository() {
    return createReservaRepository(this.ds);
  }

  get turmaRepository() {
    return createTurmaRepository(this.ds);
  }

  get turmaDisponibilidadeRepository() {
    return createTurmaDisponibilidadeRepository(this.ds);
  }

  get usuarioRepository() {
    return createUsuarioRepository(this.ds);
  }

  async transaction<T>(
    callback: (context: { databaseContext: DatabaseContext }) => T | Promise<T>,
  ): Promise<T> {
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
}
