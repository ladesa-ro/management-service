import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ImagemCreateDto } from "@/Ladesa.Management.Domain/Dtos/ImagemCreateDto";
import type { ImagemUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ImagemUpdateDto";
import type {
  IImagemArquivo,
  ImagemArquivo,
} from "@/Ladesa.Management.Domain/Entities/ImagemArquivo";

/**
 * Tipagem da entidade Imagem
 * Define a estrutura de dados sem comportamento
 */
export interface IImagem extends IEntityBase {
  /** Descricao da imagem */
  descricao: string | null;

  /** Versoes da imagem (diferentes formatos/tamanhos) */
  versoes?: IImagemArquivo[];
}

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

  /**
   * Cria uma nova instância válida de Imagem
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ImagemCreateDto): Imagem {
    const instance = new Imagem();
    instance.descricao = dados.descricao?.trim() || null;
    instance.versoes = [];
    instance.initDates();
    instance.validar();

    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Imagem {
    const instance = new Imagem();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Descrição é opcional, sem validações obrigatórias
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da imagem
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: ImagemUpdateDto): void {
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
