using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Bloco. */
model Bloco {
  ...EntityIdUuid;

  /** Nome do Bloco. */
  @minLength(1)
  nome: string;

  /** Código do Bloco. */
  @minLength(1)
  codigo: string;

  /** Campus. */
  campus: Campus;

  /** Imagem de capa. */
  imagemCapa: Imagem | null;

  /** Ambientes. */
  ambientes: Ambiente[];

  ...EntityDated;
}
