using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Endereço. */
model Endereco {
  ...EntityIdUuid;

  /** Código postal (CEP). */
  @Metadata.Constraints.EnderecoCep
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
