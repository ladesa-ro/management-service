using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

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
