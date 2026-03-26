/**
 * @deprecated Use `createMapper` de `@/shared/mapping/create-mapper` em vez deste arquivo.
 * Este módulo será removido após a migração completa de todos os mappers.
 *
 * Shared mapper for imagem output in presentation layer.
 * Uses structural interfaces to accommodate varying query result shapes.
 * Generic return type T lets callers specify the expected output DTO.
 */

interface ImagemLikeArquivo {
  id: string;
  name: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  storageType: string;
  dateCreated?: unknown;
  dateUpdated?: unknown;
  dateDeleted?: unknown;
}

interface ImagemLikeVersao {
  id: string;
  largura: number | null;
  altura: number | null;
  formato: string | null;
  mimeType: string | null;
  arquivo: ImagemLikeArquivo;
  dateCreated?: unknown;
  dateUpdated?: unknown;
  dateDeleted?: unknown;
}

export interface ImagemLike {
  id: string;
  descricao: string | null;
  versoes?: ImagemLikeVersao[];
  dateCreated?: unknown;
  dateUpdated?: unknown;
  dateDeleted?: unknown;
}

export function mapImagemOutput<T = unknown>(imagem: ImagemLike | null | undefined): T | null {
  if (!imagem) return null;
  return {
    id: imagem.id,
    descricao: imagem.descricao,
    versoes: (imagem.versoes || []).map((v) => ({
      id: v.id,
      largura: v.largura,
      altura: v.altura,
      formato: v.formato,
      mimeType: v.mimeType,
      arquivo: {
        id: v.arquivo.id,
        name: v.arquivo.name,
        mimeType: v.arquivo.mimeType,
        sizeBytes: v.arquivo.sizeBytes,
        storageType: v.arquivo.storageType,
        dateCreated: v.arquivo.dateCreated,
        dateUpdated: v.arquivo.dateUpdated,
        dateDeleted: v.arquivo.dateDeleted,
      },
      dateCreated: v.dateCreated,
      dateUpdated: v.dateUpdated,
      dateDeleted: v.dateDeleted,
    })),
    dateCreated: imagem.dateCreated,
    dateUpdated: imagem.dateUpdated,
    dateDeleted: imagem.dateDeleted,
  } as T;
}
