import type { Readable } from "node:stream";

/**
 * Resultado de stream de arquivo neutro de framework.
 *
 * Usado no domain/application para retornar dados de arquivo sem
 * acoplar a NestJS StreamableFile. A conversão para StreamableFile
 * é feita na camada de presentation.
 */

export interface IStreamableFileResult {
  readonly stream: Readable;
  readonly mimeType?: string;
  readonly disposition?: string;
}
