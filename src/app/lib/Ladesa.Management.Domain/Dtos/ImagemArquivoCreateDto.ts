import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Arquivo } from "@/Ladesa.Management.Domain/Entities/Arquivo";
import { type Imagem } from "@/Ladesa.Management.Domain/Entities/Imagem";

/**
 * Interface para criação de ImagemArquivo
 */
export interface ImagemArquivoCreateDto {
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: IFindOneByIdDto<Imagem["id"]>;
  arquivo: IFindOneByIdDto<Arquivo["id"]>;
}
