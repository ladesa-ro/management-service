using TypeSpec.JsonSchema;
using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Endereço. */
model Endereco {
  ...EntityIdUuid;

  /** Código postal (CEP). */
  // @extension("x-validate-cep", Json<true>)
  cep: string;

  /** Logradouro. */
  logradouro: string;

  /** Número. */
  @minValue(0)
  @maxValue(99999)
  numero: uint16;

  /** Bairro. */
  bairro: string;

  /** Complemento. */
  complemento: string | null;

  /** Ponto de referência. */
  pontoReferencia: string | null;

  /** Cidade. */
  cidade: Cidade;

  ...EntityDated;
}
