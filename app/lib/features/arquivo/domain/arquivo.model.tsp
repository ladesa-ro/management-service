using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

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
