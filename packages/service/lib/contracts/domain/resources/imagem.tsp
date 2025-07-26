using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

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
