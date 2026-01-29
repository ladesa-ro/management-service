import type { Readable } from "node:stream";
import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type { ArquivoCreateInputDto } from "@/v2/server/modules/arquivo/http/dto";
import type { ArquivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

type IGetFileAcesso = null | {
  nome?: string;
  id?: string;
};

/**
 * Porta de entrada (use case) para operações de Arquivo
 * Define os casos de uso disponíveis para o domínio
 */
export interface IArquivoUseCasePort {
  /**
   * Verifica se os dados de um arquivo existem no storage
   */
  dataExists(id: string): Promise<false | "dir" | "file" | "other">;

  /**
   * Lê os dados de um arquivo como stream
   */
  dataReadAsStream(id: string): Promise<Readable | null>;

  /**
   * Obtém um arquivo com verificação de acesso
   */
  getFile(
    accessContext: AccessContext | null,
    id: string,
    acesso: IGetFileAcesso | null,
  ): Promise<{
    id: string;
    nome: string | null;
    mimeType: string | null;
    stream: Readable | null;
  }>;

  /**
   * Obtém um arquivo como StreamableFile
   */
  getStreamableFile(
    accessContext: AccessContext | null,
    id: string,
    acesso: IGetFileAcesso | null,
  ): Promise<StreamableFile>;

  /**
   * Salva dados de um arquivo no storage
   */
  dataSave(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<boolean>;

  /**
   * Cria um novo arquivo
   */
  arquivoCreate(
    dto: Pick<ArquivoCreateInputDto, "name" | "mimeType">,
    data: NodeJS.ArrayBufferView | Readable,
  ): Promise<Pick<ArquivoEntity, "id">>;
}
