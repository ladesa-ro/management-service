import { setTypeSpecNamespace } from "@typespec/compiler"
import { $extension } from "@typespec/json-schema"

export function $EntityId(context, target, entityId) {
  $extension(context, target, "x-ladesa-schema-kind", "entity")
  $extension(context, target, "x-ladesa-schema-entity-id", entityId.value)
  $extension(context, target, "additionalProperties", false)
}

export function $EntityPartialOfId(context, target, partialOf) {
  $extension(context, target, "x-ladesa-schema-entity-partial-of-id", partialOf.value)
}


export function $EntityExists(context, target, partialOf) {
  $extension(context, target, "x-ladesa-schema-constraint-entity-partial-of-id", partialOf.value)
}

export function $EnderecoCep(context, target) {
  $extension(context, target, "x-ladesa-schema-constraint-cep", true)
}

export function $EnderecoEstadoSigla(context, target) {
  $extension(context, target, "x-ladesa-schema-constraint-estado-sigla", true)
}

setTypeSpecNamespace("Ladesa.Domain.v4.Generics.Entities.Metadata", $EntityId)
setTypeSpecNamespace("Ladesa.Domain.v4.Generics.Entities.Metadata", $EntityPartialOfId)
setTypeSpecNamespace("Ladesa.Domain.v4.Generics.Entities.Metadata.Constraints", $EntityExists)
setTypeSpecNamespace("Ladesa.Domain.v4.Generics.Entities.Metadata.Constraints", $EnderecoCep)
setTypeSpecNamespace("Ladesa.Domain.v4.Generics.Entities.Metadata.Constraints", $EnderecoEstadoSigla)
