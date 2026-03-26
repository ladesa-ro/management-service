import { ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";

/**
 * Obtém o IStreamableFileResult de um campo de imagem de uma entidade.
 *
 * Reutilizável por qualquer handler que possua campos de imagem.
 */

export async function getEntityImagemStreamableFile(
  entity: Record<string, unknown>,
  fieldName: string,
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
  const imagem = entity[fieldName] as { id: string } | null | undefined;

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
  currentId: string | number,
  file: Express.Multer.File,
  fieldName: string,
  saveImagemCapaHandler: {
    execute(
      accessContext: IAccessContext | null,
      command: { file: Express.Multer.File },
    ): Promise<{ imagem: { id: string } }>;
  },
  repository: { update(id: string | number, data: Record<string, unknown>): Promise<void> },
): Promise<boolean> {
  const { imagem } = await saveImagemCapaHandler.execute(null, { file });

  await repository.update(currentId, { [fieldName]: { id: imagem.id } });

  return true;
}
