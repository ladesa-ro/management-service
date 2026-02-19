import type { Arquivo } from "@/modules/armazenamento/arquivo/domain/arquivo.domain";
import type { Imagem } from "@/modules/armazenamento/imagem/domain/imagem.domain";
import { BaseDatedEntity } from "@/modules/@shared";
import type {
  IImagemArquivo,
  IImagemArquivoCreate,
  IImagemArquivoUpdate,
} from "./imagem-arquivo.types";

/**
 * Entidade de Domínio: ImagemArquivo
 * Implementa a tipagem IImagemArquivo e adiciona regras de negócio
 */
export class ImagemArquivo extends BaseDatedEntity implements IImagemArquivo {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: Imagem;
  arquivo!: Arquivo;

  protected static get entityName(): string {
    return "ImagemArquivo";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = ImagemArquivo.createValidation();
    rules.requiredNumber(this.largura, "largura");
    rules.min(this.largura, "largura", 1);
    rules.requiredNumber(this.altura, "altura");
    rules.min(this.altura, "altura", 1);
    rules.required(this.formato, "formato");
    rules.required(this.mimeType, "mimeType");
    ImagemArquivo.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de ImagemArquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IImagemArquivoCreate): ImagemArquivo {
    const instance = new ImagemArquivo();
    instance.largura = dados.largura ?? 0;
    instance.altura = dados.altura ?? 0;
    instance.formato = dados.formato?.trim() ?? "";
    instance.mimeType = dados.mimeType?.trim() ?? "";
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): ImagemArquivo {
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
    if (dados.largura !== undefined) {
      this.largura = dados.largura ?? 0;
    }

    if (dados.altura !== undefined) {
      this.altura = dados.altura ?? 0;
    }

    if (dados.formato !== undefined) {
      this.formato = dados.formato?.trim() ?? "";
    }

    if (dados.mimeType !== undefined) {
      this.mimeType = dados.mimeType?.trim() ?? "";
    }

    this.touchUpdated();
    this.validar();
  }
}
