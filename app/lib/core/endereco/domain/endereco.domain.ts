import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { ICidade } from "@/core/cidade";
import type { IEndereco } from "./endereco.types";

export class Endereco extends BaseEntity implements IEndereco {
  id!: string;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: ICidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static fromData(dados: IEndereco): Endereco {
    const instance = new Endereco();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos específicos do domínio Endereco
  // ========================================

  getEnderecoFormatado(): string {
    const partes = [
      this.logradouro,
      this.numero.toString(),
      this.complemento,
      this.bairro,
      this.cidade?.nome,
      this.cidade?.estado?.sigla,
      this.cep,
    ].filter(Boolean);

    return partes.join(", ");
  }

  isCepValido(): boolean {
    const cepLimpo = this.cep.replace(/\D/g, "");
    return /^\d{8}$/.test(cepLimpo);
  }
}
