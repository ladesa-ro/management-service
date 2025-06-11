using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Curso. */
model Curso {
  ...EntityIdUuid;

  /** Nome do curso. */
  @minLength(1)
  nome: string;

  /** Nome abreviado do curso. */
  @minLength(1)
  nomeAbreviado: string;

  /** Campus que o curso pertence. */
  campus: Campus;

  /** Oferta de formação do curso. */
  ofertaFormacao: OfertaFormacao;

  /** Imagem de capa do curso. */
  imagemCapa: Imagem | null;

  ...EntityDated;
}
