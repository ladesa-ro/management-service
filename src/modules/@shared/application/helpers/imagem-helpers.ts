import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "../errors";

/**
 * Obtém o StreamableFile de um campo de imagem de uma entidade.
 *
 * Reutilizável por qualquer handler que possua campos de imagem.
 */
export async function getEntityImagemStreamableFile(
  entity: Record<string, any>,
  fieldName: string,
  resourceLabel: string,
  entityId: string | number,
  getLatestArquivoIdHandler: {
    execute(
      accessContext: AccessContext | null,
      query: { imagemId: string },
    ): Promise<string | null>;
  },
  getStreamableFileHandler: {
    execute(accessContext: AccessContext | null, query: { id: string }): Promise<StreamableFile>;
  },
): Promise<StreamableFile> {
  const imagem = entity[fieldName];

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
      accessContext: AccessContext | null,
      command: { file: Express.Multer.File },
    ): Promise<{ imagem: { id: string } }>;
  },
  repository: { update(id: string | number, data: Record<string, any>): Promise<void> },
): Promise<boolean> {
  const { imagem } = await saveImagemCapaHandler.execute(null, { file });

  await repository.update(currentId, { [fieldName]: { id: imagem.id } });

  return true;
}
