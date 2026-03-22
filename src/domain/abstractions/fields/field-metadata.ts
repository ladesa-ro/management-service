/**
 * FieldMetadata — classe base para descrever campos de entidades do dominio.
 *
 * Cada campo carrega descricao, schema zod opcional e flags (nullable, defaultValue).
 * A partir desses metadados, .swaggerMetadata e .gqlMetadata geram automaticamente
 * as decoracoes para a camada de apresentacao (REST e GraphQL).
 *
 * Uso: instanciar via createFieldMetadata() nos arquivos *.fields.ts de cada modulo.
 */
import type { z } from "zod";
import { zodApiProperty } from "@/shared/presentation/zod-api-property";

export interface IFieldMetadataInputWithSchema<TSchema extends z.ZodType> {
  description: string;
  schema: TSchema;
  nullable?: boolean;
  defaultValue?: unknown;
}

export interface IFieldMetadataInputWithoutSchema {
  description: string;
  nullable?: boolean;
  defaultValue?: unknown;
}

export type IGqlFieldMetadata = Record<string, unknown> & {
  description: string;
};

export class FieldMetadata<TSchema extends z.ZodType = z.ZodType> {
  readonly description: string;
  readonly schema: TSchema | undefined;
  readonly nullable?: boolean;
  readonly defaultValue?: unknown;

  constructor(input: IFieldMetadataInputWithSchema<TSchema> | IFieldMetadataInputWithoutSchema) {
    this.description = input.description;
    this.schema = "schema" in input ? input.schema : undefined;
    this.nullable = input.nullable;
    this.defaultValue = input.defaultValue;
  }

  get swaggerMetadata(): Record<string, unknown> {
    const result: Record<string, unknown> = this.schema
      ? zodApiProperty(this.schema, { description: this.description })
      : { description: this.description };

    if (this.nullable && !result.nullable) {
      result.nullable = true;
    }

    return result;
  }

  get gqlMetadata(): IGqlFieldMetadata {
    const result: Record<string, unknown> = {
      description: this.description,
    };

    const isNullable =
      this.nullable ?? (this.schema ? !!zodApiProperty(this.schema).nullable : false);

    if (isNullable) {
      result.nullable = true;
    }

    const defaultVal =
      this.defaultValue ?? (this.schema ? zodApiProperty(this.schema).default : undefined);

    if (defaultVal !== undefined) {
      result.defaultValue = defaultVal;
    }

    return result as IGqlFieldMetadata;
  }
}

export interface FieldMetadataWithSchema<TSchema extends z.ZodType> extends FieldMetadata<TSchema> {
  readonly schema: TSchema;
}

export function createFieldMetadata<TSchema extends z.ZodType>(
  input: IFieldMetadataInputWithSchema<TSchema>,
): FieldMetadataWithSchema<TSchema>;

export function createFieldMetadata(input: IFieldMetadataInputWithoutSchema): FieldMetadata;

export function createFieldMetadata<TSchema extends z.ZodType>(
  input: IFieldMetadataInputWithSchema<TSchema> | IFieldMetadataInputWithoutSchema,
): FieldMetadata<TSchema> {
  return new FieldMetadata(input as IFieldMetadataInputWithSchema<TSchema>);
}
