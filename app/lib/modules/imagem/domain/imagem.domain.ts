import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { ImagemArquivo } from "@/modules/imagem-arquivo/domain/imagem-arquivo.domain";
import type { IImagem, IImagemCreate, IImagemUpdate } from "./imagem.types";

/**
 * Entidade de Domínio: Imagem
 * Implementa a tipagem IImagem e adiciona regras de negócio
 */
export class Imagem extends BaseEntity implements IImagem {
  id!: IdUuid;
  descricao!: string | null;
  versoes!: ImagemArquivo[];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Imagem";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Imagem
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IImagemCreate): Imagem {
    const { rules } = this.createValidation();

    const instance = new Imagem();
    instance.descricao = rules.optional(dados.descricao);
    instance.versoes = [];
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IImagem): Imagem {
    const instance = new Imagem();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da imagem
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IImagemUpdate): void {
    const { rules } = Imagem.createValidation();

    if (dados.descricao !== undefined) {
      this.descricao = rules.optional(dados.descricao);
    }

    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
