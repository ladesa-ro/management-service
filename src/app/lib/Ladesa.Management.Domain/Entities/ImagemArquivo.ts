import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ImagemArquivoCreateDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoCreateDto";
import type { ImagemArquivoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoUpdateDto";

/**
 * Entidade de Domínio: ImagemArquivo
 * Implementa a tipagem IImagemArquivo e adiciona regras de negócio
 */
export class ImagemArquivo extends BaseDatedEntity {
  private constructor(
    public largura: number,
    public altura: number,
    public formato: string,
    public mimeType: string,
    public imagemId: IdUuid,
    public arquivoId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "ImagemArquivo";
  }

  static criar(dados: ImagemArquivoCreateDto): ImagemArquivo {
    const instance = new ImagemArquivo(
      dados.largura ?? 0,
      dados.altura ?? 0,
      dados.formato?.trim() ?? "",
      dados.mimeType?.trim() ?? "",
      dados.imagem.id,
      dados.arquivo.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: ImagemArquivo): ImagemArquivo {
    const instance = new ImagemArquivo(
      data.largura,
      data.altura,
      data.formato,
      data.mimeType,
      data.imagemId,
      data.arquivoId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

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

  atualizar(dados: ImagemArquivoUpdateDto): void {
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
