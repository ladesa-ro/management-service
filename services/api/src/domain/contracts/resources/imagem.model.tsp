using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/**
 * Imagem.
 */
model Imagem {
  ...EntityIdUuid;

  /**
   * Descrição da imagem.
   */
  descricao: string | null;

  /**
   * Versões da imagem.
   */
  versoes: ImagemArquivo[];

  ...EntityDated;
}
