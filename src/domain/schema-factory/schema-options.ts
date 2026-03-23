export type SchemaMode = "domain" | "presentation";

export interface StandardSchemaOptions {
  mode: SchemaMode;
  strict: boolean;
  coerce: boolean;
}

export type ExtraSchemaOptions = Record<string, unknown>;

export const DOMAIN_OPTIONS: StandardSchemaOptions = {
  mode: "domain",
  strict: true,
  coerce: false,
};

export const PRESENTATION_OPTIONS: StandardSchemaOptions = {
  mode: "presentation",
  strict: false,
  coerce: true,
};
