/**
 * FieldMetadata — classe base para descrever campos de entidades do dominio.
 *
 * Cada campo carrega descricao, SchemaFactory e flags (nullable, defaultValue).
 * A partir desses metadados, .swaggerMetadata e .gqlMetadata geram automaticamente
 * as decoracoes para a camada de apresentacao (REST e GraphQL).
 *
 * Uso: instanciar via createFieldMetadata() nos arquivos *.fields.ts de cada modulo.
 */
import { z } from "zod";
import {
  createSchema,
  type SchemaFactory,
  type StandardSchemaOptions,
} from "@/domain/schema-factory";
import { zodApiProperty } from "@/shared/presentation/zod-api-property";

export interface IFieldMetadataInputWithSchema<TSchema extends z.ZodType> {
  description: string;
  schema: SchemaFactory<TSchema> | TSchema;
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

function toSchemaFactory<TSchema extends z.ZodType>(
  input: SchemaFactory<TSchema> | TSchema,
): SchemaFactory<TSchema> {
  if (
    input instanceof Object &&
    "create" in input &&
    "domain" in input &&
    "presentation" in input
  ) {
    return input as SchemaFactory<TSchema>;
  }
  return createSchema(() => input as TSchema) as SchemaFactory<TSchema>;
}

const unknownSchemaFactory = createSchema(() => z.unknown());

export class FieldMetadata<TSchema extends z.ZodType = z.ZodType> {
  readonly description: string;
  readonly schemaFactory: SchemaFactory<TSchema>;
  readonly nullable?: boolean;
  readonly defaultValue?: unknown;

  /** Whether the field was created with an explicit schema (not the unknown fallback). */
  private readonly _hasExplicitSchema: boolean;

  constructor(input: IFieldMetadataInputWithSchema<TSchema> | IFieldMetadataInputWithoutSchema) {
    this.description = input.description;
    this._hasExplicitSchema = "schema" in input && input.schema !== undefined;
    this.schemaFactory = this._hasExplicitSchema
      ? toSchemaFactory((input as IFieldMetadataInputWithSchema<TSchema>).schema)
      : (unknownSchemaFactory as unknown as SchemaFactory<TSchema>);
    this.nullable = input.nullable;
    this.defaultValue = input.defaultValue;
  }

  /** Cria schema para um mode especifico (propaga standard). */
  create(standard: StandardSchemaOptions): TSchema {
    return this.schemaFactory.create(standard);
  }

  /** Schema presentation (com coercao) — para DTOs REST. */
  get inputSchema(): TSchema {
    return this.schemaFactory.presentation;
  }

  /** Schema domain (estrito) — para validacao no dominio. */
  get domainSchema(): TSchema {
    return this.schemaFactory.domain;
  }

  get swaggerMetadata(): Record<string, unknown> {
    const result: Record<string, unknown> = this._hasExplicitSchema
      ? zodApiProperty(this.domainSchema, { description: this.description })
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

    const schema = this._hasExplicitSchema ? this.domainSchema : undefined;

    const isNullable = this.nullable ?? (schema ? !!zodApiProperty(schema).nullable : false);

    if (isNullable) {
      result.nullable = true;
    }

    const defaultVal = this.defaultValue ?? (schema ? zodApiProperty(schema).default : undefined);

    if (defaultVal !== undefined) {
      result.defaultValue = defaultVal;
    }

    return result as IGqlFieldMetadata;
  }
}

export interface FieldMetadataWithSchema<TSchema extends z.ZodType> extends FieldMetadata<TSchema> {
  readonly schemaFactory: SchemaFactory<TSchema>;
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
