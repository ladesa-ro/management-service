import type { Usuario } from "@/core/usuario/domain/usuario.domain";
import type {
  IProfessorIndisponibilidade,
  IProfessorIndisponibilidadeCreate,
} from "./professor-indisponibilidade.types";

export class ProfessorIndisponibilidade implements IProfessorIndisponibilidade {
  id!: string;
  perfil!: Usuario;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  static criar(dados: IProfessorIndisponibilidadeCreate): ProfessorIndisponibilidade {
    const professorIndisponibilidade = new ProfessorIndisponibilidade();
    professorIndisponibilidade.diaDaSemana = dados.diaDaSemana;
    professorIndisponibilidade.horaInicio = dados.horaInicio;
    professorIndisponibilidade.horaFim = dados.horaFim;
    professorIndisponibilidade.motivo = dados.motivo;
    return professorIndisponibilidade;
  }

  static fromData(dados: IProfessorIndisponibilidade): ProfessorIndisponibilidade {
    const professorIndisponibilidade = new ProfessorIndisponibilidade();
    Object.assign(professorIndisponibilidade, dados);
    return professorIndisponibilidade;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
