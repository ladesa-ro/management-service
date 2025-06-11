using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/**
 * Arquivo.
 */
model Arquivo {
  ...EntityIdUuid;

  /** Nome do arquivo. */
  name: string | null;

  /** Formato do arquivo. */
  mimeType: string | null;

  /** Tamanho do arquivo (em bytes). */
  sizeBytes: integer | null;

  /** Estratégia de armazenamento do conteúdo. */
  storageType: string;

  ...EntityDated;
}
