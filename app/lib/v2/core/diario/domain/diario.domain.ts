import type { IAmbiente } from "@/v2/core/ambiente/domain/ambiente.types";
import type { ICalendarioLetivo } from "@/v2/core/calendario-letivo/domain/calendario-letivo.types";
import type { IDisciplina } from "@/v2/core/disciplina/domain/disciplina.types";
import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";
import type { ITurma } from "@/v2/core/turma/domain/turma.types";
import type { IDiario, IDiarioCreate } from "./diario.types";

/**
 * Entidade de Domínio: Diario
 */
export class Diario implements IDiario {
  id!: string;
  ativo!: boolean;
  calendarioLetivo!: ICalendarioLetivo;
  turma!: ITurma;
  disciplina!: IDisciplina;
  ambientePadrao!: IAmbiente | null;
  imagemCapa!: IImagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  static criar(dados: IDiarioCreate): Diario {
    const instance = new Diario();
    instance.ativo = dados.ativo ?? true;
    instance.ambientePadrao = null;
    instance.imagemCapa = null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;
    return instance;
  }

  static fromData(dados: IDiario): Diario {
    const instance = new Diario();
    Object.assign(instance, dados);
    return instance;
  }
}
