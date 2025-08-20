using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Campus. */
model Campus {
  ...EntityIdUuid;

  /** Nome fantasia do campus. */
  @minLength(1)
  nomeFantasia: string;

  /** Razão social do campus. */
  @minLength(1)
  razaoSocial: string;

  /** Apelido do campus. */
  @minLength(1)
  apelido: string;

  /** CNPJ do campus. */
  @minLength(1)
  cnpj: string;

  /** Endereço do campus */
  endereco: Endereco;

  ...EntityDated;
}
