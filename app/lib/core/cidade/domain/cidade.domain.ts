import type { IdNumeric } from "@/core/@shared";
import type { IEstado } from "@/core/estado";
import type { ICidade } from "./cidade.types";

/**
 * Entidade de Domínio: Cidade
 */
export class Cidade implements ICidade {
  id!: IdNumeric;
  nome!: string;
  estado!: IEstado;

  static fromData(dados: ICidade): Cidade {
    const instance = new Cidade();
    instance.id = dados.id;
    instance.nome = dados.nome;
    instance.estado = dados.estado;
    return instance;
  }

  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
