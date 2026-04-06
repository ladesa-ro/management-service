import type { ImagemArquivoFindOneQueryResult } from "@/modules/armazenamento/imagem-arquivo/domain/queries";
import { createMapper } from "@/shared/mapping";
import type { ImagemArquivoEntity } from "./imagem-arquivo.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToFindOneQueryResult = createMapper<
  ImagemArquivoEntity,
  ImagemArquivoFindOneQueryResult
>((e) => ({
  id: e.id,
  largura: e.largura,
  altura: e.altura,
  formato: e.formato,
  mimeType: e.mimeType,
  imagem: e.imagem,
  arquivo: e.arquivo,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));
