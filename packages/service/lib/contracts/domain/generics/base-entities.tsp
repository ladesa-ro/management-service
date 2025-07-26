import "@typespec/json-schema";

namespace Ladesa.ManagementService.Domain.Generics;

using TypeSpec.JsonSchema;

@extension("additionalProperties", false)
model EntityBase {}

/**
 * Estrutura identificada por id no formato uuid.
 */
model EntityIdUuid is EntityBase {
  /** Identificador do registro (uuid). */
  id: id_uuid;
}

/**
 * Estrutura identificada por id no formato numérico.
 */
model EntityIdInteger is EntityBase {
  /** Identificador do registro (numérico). */
  id: id_integer;
}

/**
 * Estrutura datada.
 */
model EntityDated is EntityBase {
  /** Data e hora da criação do registro. */
  dateCreated: date_time;

  /** Data e hora da alteração do registro. */
  dateUpdated: date_time;

  /** Data e hora da exclusão do registro. */
  dateDeleted: date_time | null;
}
