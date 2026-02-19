import type { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";
import { BaseDatedEntity } from "@/modules/@shared";
import type { IImagem, IImagemCreate, IImagemUpdate } from "./imagem.types";

/**
 * Entidade de Domínio: Imagem
 * Implementa a tipagem IImagem e adiciona regras de negócio
 */
export class Imagem extends BaseDatedEntity implements IImagem {
  descricao!: string | null;
  versoes!: ImagemArquivo[];

  protected static get entityName(): string {
    return "Imagem";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    // Descrição é opcional, sem validações obrigatórias
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Imagem
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IImagemCreate): Imagem {
    const instance = new Imagem();
    instance.descricao = dados.descricao?.trim() || null;
    instance.versoes = [];
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Imagem {
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
    if (dados.descricao !== undefined) {
      this.descricao = dados.descricao?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
