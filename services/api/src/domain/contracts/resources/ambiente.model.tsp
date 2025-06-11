using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Ambiente. */
model Ambiente {
  ...EntityIdUuid;

  /** Nome do ambiente/sala. */
  @minLength(1)
  nome: string;

  /** Descrição do ambiente/sala. */
  descricao: string | null;

  /** Código do ambiente/sala. */
  @minLength(1)
  codigo: string;

  /** Capacidade do ambiente/sala. */
  capacidade: integer | null;

  /** Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química. */
  tipo: string | null;

  /** Bloco que o ambiente/sala pertence. */
  bloco: Bloco;

  /** Imagem de capa. */
  imagemCapa: Imagem | null;

  ...EntityDated;
}
