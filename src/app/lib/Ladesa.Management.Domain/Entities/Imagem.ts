import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ImagemCreateDto } from "@/Ladesa.Management.Domain/Dtos/ImagemCreateDto";
import type { ImagemUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ImagemUpdateDto";
import type { ImagemArquivo } from "@/Ladesa.Management.Domain/Entities/ImagemArquivo";

/**
 * Entidade de Domínio: Imagem
 * Implementa a tipagem IImagem e adiciona regras de negócio
 */
export class Imagem extends BaseDatedEntity {
  public versoes: ImagemArquivo[];

  private constructor(public descricao: string | null) {
    super();
    this.versoes = [];
  }

  protected static get entityName(): string {
    return "Imagem";
  }

  static criar(dados: ImagemCreateDto): Imagem {
    const instance = new Imagem(dados.descricao?.trim() || null);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Imagem): Imagem {
    const instance = new Imagem(data.descricao);
    instance.versoes = data.versoes;
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Descrição é opcional, sem validações obrigatórias
  }

  atualizar(dados: ImagemUpdateDto): void {
    if (dados.descricao !== undefined) {
      this.descricao = dados.descricao?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }

  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
