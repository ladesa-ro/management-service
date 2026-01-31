import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { Arquivo } from "@/modules/arquivo/domain/arquivo.domain";
import type { Imagem } from "@/modules/imagem/domain/imagem.domain";
import type {
  IImagemArquivo,
  IImagemArquivoCreate,
  IImagemArquivoUpdate,
} from "./imagem-arquivo.types";

/**
 * Entidade de Domínio: ImagemArquivo
 * Implementa a tipagem IImagemArquivo e adiciona regras de negócio
 */
export class ImagemArquivo extends BaseEntity implements IImagemArquivo {
  id!: IdUuid;
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: Imagem;
  arquivo!: Arquivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "ImagemArquivo";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de ImagemArquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IImagemArquivoCreate): ImagemArquivo {
    const { result, rules } = this.createValidation();

    const instance = new ImagemArquivo();
    instance.largura = rules.requiredNumber(dados.largura, "largura");
    instance.largura = rules.min(instance.largura, "largura", 1);

    instance.altura = rules.requiredNumber(dados.altura, "altura");
    instance.altura = rules.min(instance.altura, "altura", 1);

    instance.formato = rules.required(dados.formato, "formato");
    instance.mimeType = rules.required(dados.mimeType, "mimeType");

    this.throwIfInvalid(result);

    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IImagemArquivo): ImagemArquivo {
    const instance = new ImagemArquivo();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da imagem arquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IImagemArquivoUpdate): void {
    const { result, rules } = ImagemArquivo.createValidation();

    if (dados.largura !== undefined) {
      this.largura = rules.requiredNumber(dados.largura, "largura");
      this.largura = rules.min(this.largura, "largura", 1);
    }

    if (dados.altura !== undefined) {
      this.altura = rules.requiredNumber(dados.altura, "altura");
      this.altura = rules.min(this.altura, "altura", 1);
    }

    if (dados.formato !== undefined) {
      this.formato = rules.required(dados.formato, "formato");
    }

    if (dados.mimeType !== undefined) {
      this.mimeType = rules.required(dados.mimeType, "mimeType");
    }

    ImagemArquivo.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
