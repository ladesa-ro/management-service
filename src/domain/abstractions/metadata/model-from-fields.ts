/**
 * Utilitario para converter FieldMetadata em PropertyRepresentation do TypeORM.
 *
 * Usado nos arquivos *.query.result.ts para registrar modelos
 * no model-registry a partir dos campos definidos em *.fields.ts.
 */
import type { FieldMetadata } from "@/domain/abstractions";
import { type PropertyRepresentation, simpleProperty } from "./model-registry";

export function fieldToProperty(name: string, field: FieldMetadata): PropertyRepresentation {
  return simpleProperty(name, { nullable: !!field.nullable });
}

export function fieldsToProperties(
  fields: Record<string, FieldMetadata>,
): PropertyRepresentation[] {
  return Object.entries(fields).map(([name, field]) => fieldToProperty(name, field));
}
