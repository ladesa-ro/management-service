import type { ScalarDateTimeString } from "@/core/@shared";
import type { Diario } from "@/core/diario/domain/diario.domain";
import type { Perfil } from "@/core/perfil";
import type { IDiarioProfessor, IDiarioProfessorCreate } from "./diario-professor.types";

export class DiarioProfessor implements IDiarioProfessor {
  id!: string;
  situacao!: boolean;
  diario!: Diario;
  perfil!: Perfil;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IDiarioProfessorCreate): DiarioProfessor {
    const diarioProfessor = new DiarioProfessor();
    diarioProfessor.situacao = dados.situacao;
    return diarioProfessor;
  }

  static fromData(dados: IDiarioProfessor): DiarioProfessor {
    const diarioProfessor = new DiarioProfessor();
    Object.assign(diarioProfessor, dados);
    return diarioProfessor;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
