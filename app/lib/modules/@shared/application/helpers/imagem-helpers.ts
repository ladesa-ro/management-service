import type { StreamableFile } from "@nestjs/common";
import { ResourceNotFoundError } from "../errors";

/**
 * Obtém o StreamableFile de um campo de imagem de uma entidade.
 *
 * Reutilizável por qualquer service que possua campos de imagem.
 */
export async function getEntityImagemStreamableFile(
  entity: Record<string, any>,
  fieldName: string,
  resourceLabel: string,
  entityId: string | number,
  imagemService: { getLatestArquivoIdForImagem(imagemId: string): Promise<string | null> },
  arquivoService: {
    getStreamableFile(accessContext: null, dto: { id: string }): Promise<StreamableFile>;
  },
): Promise<StreamableFile> {
  const imagem = entity[fieldName];

  if (imagem?.id) {
    const arquivoId = await imagemService.getLatestArquivoIdForImagem(imagem.id);

    if (arquivoId) {
      return arquivoService.getStreamableFile(null, { id: arquivoId });
    }
  }

  throw new ResourceNotFoundError(resourceLabel, entityId);
}

/**
 * Salva uma nova imagem e associa ao campo de imagem de uma entidade.
 *
 * Reutilizável por qualquer service que possua campos de imagem.
 */
export async function saveEntityImagemField<E>(
  currentId: string | number,
  file: Express.Multer.File,
  fieldName: string,
  imagemService: { saveImagemCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }> },
  repository: { create(): E; merge(entity: E, partial: any): void; save(entity: E): Promise<any> },
): Promise<boolean> {
  const { imagem } = await imagemService.saveImagemCapa(file);

  const entity = repository.create();
  repository.merge(entity, { id: currentId });
  repository.merge(entity, { [fieldName]: { id: imagem.id } });

  await repository.save(entity);

  return true;
}
