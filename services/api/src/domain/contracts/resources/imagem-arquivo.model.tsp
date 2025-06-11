using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/**
 * ImagemArquivo.
 */
model ImagemArquivo {
  ...EntityIdUuid;

  /** Largura da imagem. */
  largura: integer;

  /** Altura da imagem. */
  altura: integer;

  /** Formato da imagem. */
  formato: string;

  /** Mime-type da imagem. */
  mimeType: string;

  /** Imagem. */
  imagem: Imagem;

  /** Arquivo. */
  arquivo: Arquivo;

  ...EntityDated;
}
