import { ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";

/**
 * Obtém o IStreamableFileResult de um campo de imagem de uma entidade.
 *
 * Reutilizável por qualquer handler que possua campos de imagem.
 */

export async function getEntityImagemStreamableFile(
  imagem: { id: string } | null | undefined,
  resourceLabel: string,
  entityId: string | number,
  getLatestArquivoIdHandler: {
    execute(
      accessContext: IAccessContext | null,
      query: { imagemId: string },
    ): Promise<string | null>;
  },
  getStreamableFileHandler: {
    execute(
      accessContext: IAccessContext | null,
      query: { id: string },
    ): Promise<IStreamableFileResult>;
  },
): Promise<IStreamableFileResult> {
  if (imagem?.id) {
    const arquivoId = await getLatestArquivoIdHandler.execute(null, { imagemId: imagem.id });

    if (arquivoId) {
      return getStreamableFileHandler.execute(null, { id: arquivoId });
    }
  }

  throw new ResourceNotFoundError(resourceLabel, entityId);
}

/**
 * Salva uma nova imagem e associa ao campo de imagem de uma entidade.
 *
 * Reutilizável por qualquer handler que possua campos de imagem.
 */

export async function saveEntityImagemField(
  currentId: string,
  file: Express.Multer.File,
  fieldName: string,
  saveImagemCapaHandler: {
    execute(
      accessContext: IAccessContext | null,
      command: { file: Express.Multer.File },
    ): Promise<{ imagem: { id: string } }>;
  },
  repository: {
    updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void>;
  },
): Promise<boolean> {
  const { imagem } = await saveImagemCapaHandler.execute(null, { file });

  await repository.updateImagemField(currentId, fieldName, imagem.id);

  return true;
}
