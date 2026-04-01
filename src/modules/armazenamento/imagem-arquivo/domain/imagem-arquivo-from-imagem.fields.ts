/**
 * ImagemArquivo (aninhado em Imagem) — campos com nullable para versoes ainda nao processadas.
 */
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const ImagemArquivoFromImagemFields = {
  id: SharedFields.idUuid,
  largura: createFieldMetadata({
    description: "Largura da imagem (em pixels)",
    nullable: true,
  }),
  altura: createFieldMetadata({
    description: "Altura da imagem (em pixels)",
    nullable: true,
  }),
  formato: createFieldMetadata({
    description: "Formato da imagem",
    nullable: true,
  }),
  mimeType: createFieldMetadata({
    description: "Tipo MIME da imagem",
    nullable: true,
  }),
  arquivo: createFieldMetadata({ description: "Arquivo associado" }),
};
