import type { ScalarDateTimeString } from "@/core/@shared";
import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { ICalendarioLetivo } from "@/core/calendario-letivo";
import type { IDisciplina } from "@/core/disciplina/domain/disciplina.types";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { ITurma } from "@/core/turma/domain/turma.types";
import type { IDiario, IDiarioCreate } from "./diario.types";

/**
 * Entidade de Dominio: Diario
 */
export class Diario implements IDiario {
  id!: string;
  ativo!: boolean;
  calendarioLetivo!: ICalendarioLetivo;
  turma!: ITurma;
  disciplina!: IDisciplina;
  ambientePadrao!: IAmbiente | null;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IDiarioCreate): Diario {
    const instance = new Diario();
    instance.ativo = dados.ativo ?? true;
    instance.ambientePadrao = null;
    instance.imagemCapa = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;
    return instance;
  }

  static fromData(dados: IDiario): Diario {
    const instance = new Diario();
    Object.assign(instance, dados);
    return instance;
  }

  isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }
}
