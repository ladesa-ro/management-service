import type { Readable } from "node:stream";
import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import type { ArquivoCreateInput, ArquivoGetFileInput } from "../../dtos";

/**
 * Porta de entrada (use case) para operações de Arquivo
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
    input: ArquivoGetFileInput,
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
    input: ArquivoGetFileInput,
  ): Promise<StreamableFile>;

  /**
   * Salva dados de um arquivo no storage
   */
  dataSave(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<boolean>;

  /**
   * Cria um novo arquivo
   */
  arquivoCreate(
    dto: Pick<ArquivoCreateInput, "name" | "mimeType">,
    data: NodeJS.ArrayBufferView | Readable,
  ): Promise<{ id: string }>;
}
