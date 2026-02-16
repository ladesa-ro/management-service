import { DataSource, EntityManager } from "typeorm";
import { createPerfilRepository } from "@/modules/@acesso/perfil/infrastructure/persistence/typeorm/perfil.repository";
import { createUsuarioRepository } from "@/modules/@acesso/usuario/infrastructure/persistence/typeorm/usuario.repository";
import { createArquivoRepository } from "@/modules/@base/armazenamento/arquivo/infrastructure/persistence/typeorm/arquivo.repository";
import { createImagemRepository } from "@/modules/@base/armazenamento/imagem/infrastructure/persistence/typeorm/imagem.repository";
import { createImagemArquivoRepository } from "@/modules/@base/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm/imagem-arquivo.repository";
import { createCidadeRepository } from "@/modules/@base/localidades/cidade/infrastructure/persistence/typeorm/cidade.repository";
import { createEnderecoRepository } from "@/modules/@base/localidades/endereco/infrastructure/persistence/typeorm/endereco.repository";
import { createEstadoRepository } from "@/modules/@base/localidades/estado/infrastructure/persistence/typeorm/estado.repository";
// Import directly from repository files to avoid circular dependencies with adapters
import { createAmbienteRepository } from "@/modules/ambientes/ambiente/infrastructure/persistence/typeorm/ambiente.repository";
import { createBlocoRepository } from "@/modules/ambientes/bloco/infrastructure/persistence/typeorm/bloco.repository";
import { createCampusRepository } from "@/modules/ambientes/campus/infrastructure/persistence/typeorm/campus.repository";
import { createReservaRepository } from "@/modules/ambientes/reserva/infrastructure/persistence/typeorm/reserva.repository";
import { createCursoRepository } from "@/modules/ensino/curso/infrastructure/persistence/typeorm/curso.repository";
import { createDiarioRepository } from "@/modules/ensino/diario/infrastructure/persistence/typeorm/diario.repository";
import { createDiarioPreferenciaAgrupamentoRepository } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm/diario-preferencia-agrupamento.repository";
import { createDiarioProfessorRepository } from "@/modules/ensino/diario-professor/infrastructure/persistence/typeorm/diario-professor.repository";
import { createDisciplinaRepository } from "@/modules/ensino/disciplina/infrastructure/persistence/typeorm/disciplina.repository";
import { createDisponibilidadeRepository } from "@/modules/ensino/disponibilidade/infrastructure/persistence/typeorm/disponibilidade.repository";
import { createEtapaRepository } from "@/modules/ensino/etapa/infrastructure/persistence/typeorm/etapa.repository";
import { createModalidadeRepository } from "@/modules/ensino/modalidade/infrastructure/persistence/typeorm/modalidade.repository";
import { createNivelFormacaoRepository } from "@/modules/ensino/nivel-formacao/infrastructure/persistence/typeorm/nivel-formacao.repository";
import { createOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.repository";
import { createOfertaFormacaoNivelFormacaoRepository } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm/oferta-formacao-nivel-formacao.repository";
import { createProfessorIndisponibilidadeRepository } from "@/modules/ensino/professor-indisponibilidade/infrastructure/persistence/typeorm/professor-indisponibilidade.repository";
import { createTurmaRepository } from "@/modules/ensino/turma/infrastructure/persistence/typeorm/turma.repository";
import { createTurmaDisponibilidadeRepository } from "@/modules/ensino/turma-disponibilidade/infrastructure/persistence/typeorm/turma-disponibilidade.repository";
import { createAulaRepository } from "@/modules/horarios/aula/infrastructure/persistence/typeorm/aula.repository";
import { createCalendarioLetivoRepository } from "@/modules/horarios/calendario-letivo/infrastructure/persistence/typeorm/calendario-letivo.repository";
import { createDiaCalendarioRepository } from "@/modules/horarios/dia-calendario/infrastructure/persistence/typeorm/dia-calendario.repository";
import { createEventoRepository } from "@/modules/horarios/evento/infrastructure/persistence/typeorm/evento.repository";
import { createGradeHorarioOfertaFormacaoRepository } from "@/modules/horarios/grade-horario-oferta-formacao/infrastructure/persistence/typeorm/grade-horario-oferta-formacao.repository";
import { createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm/grade-horario-oferta-formacao-intervalo-de-tempo.repository";
import { createHorarioGeradoRepository } from "@/modules/horarios/horario-gerado/infrastructure/persistence/typeorm/horario-gerado.repository";
import { createHorarioGeradoAulaRepository } from "@/modules/horarios/horario-gerado-aula/infrastructure/persistence/typeorm/horario-gerado-aula.repository";
import { createIntervaloDeTempoRepository } from "@/modules/horarios/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.repository";

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
