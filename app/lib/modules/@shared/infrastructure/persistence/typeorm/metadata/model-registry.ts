/**
 * Model Metadata Registry
 * Replaces runtime TypeSpec compilation with static metadata for QbEfficientLoad
 */

export type PropertyMode = "simple" | "reference";

export interface PropertyRepresentation {
  name: string;
  nullable: boolean;
  optional: boolean;
  mode: PropertyMode;
  reference?: {
    name: string;
  };
}

export interface ModelRepresentation {
  name: string;
  properties: PropertyRepresentation[];
}

/**
 * Global registry for model metadata
 */
class ModelMetadataRegistry {
  private models: Map<string, ModelRepresentation> = new Map();

  /**
   * Register a model representation
   */
  register(model: ModelRepresentation): void {
    this.models.set(model.name, model);
  }

  /**
   * Get a model representation by name
   */
  get(name: string): ModelRepresentation {
    const model = this.models.get(name);
    if (!model) {
      throw new Error(`Model ${name} not found in registry`);
    }
    return model;
  }

  /**
   * Check if a model is registered
   */
  has(name: string): boolean {
    return this.models.has(name);
  }

  /**
   * Get all registered models
   */
  getAll(): ModelRepresentation[] {
    return Array.from(this.models.values());
  }
}

export const modelRegistry = new ModelMetadataRegistry();

/**
 * Helper function to create a simple property
 */
export function simpleProperty(
  name: string,
  options: { nullable?: boolean; optional?: boolean } = {},
): PropertyRepresentation {
  return {
    name,
    nullable: options.nullable ?? false,
    optional: options.optional ?? false,
    mode: "simple",
  };
}

/**
 * Helper function to create a reference property
 */
export function referenceProperty(
  name: string,
  referenceName: string,
  options: { nullable?: boolean; optional?: boolean } = {},
): PropertyRepresentation {
  return {
    name,
    nullable: options.nullable ?? false,
    optional: options.optional ?? false,
    mode: "reference",
    reference: { name: referenceName },
  };
}

/**
 * Helper function to define and register a model
 */
export function defineModel(
  name: string,
  properties: PropertyRepresentation[],
): ModelRepresentation {
  const model: ModelRepresentation = { name, properties };
  modelRegistry.register(model);
  return model;
}

/**
 * Common property sets used across multiple models
 */
export const commonProperties = {
  /** EntityIdUuid - UUID identifier */
  idUuid: simpleProperty("id"),

  /** EntityIdInteger - Integer identifier */
  idInteger: simpleProperty("id"),

  /** EntityDated - Timestamps */
  dated: [
    simpleProperty("dateCreated"),
    simpleProperty("dateUpdated"),
    simpleProperty("dateDeleted", { nullable: true }),
  ],

  /** EntityDated + EntityIdUuid combined */
  entityBaseUuid: [
    simpleProperty("id"),
    simpleProperty("dateCreated"),
    simpleProperty("dateUpdated"),
    simpleProperty("dateDeleted", { nullable: true }),
  ],
};

/**
 * Decorator to register a model at class definition time
 * Usage:
 * @RegisterModel({ properties: [...] })
 * export class MyFindOneOutputDto { ... }
 */
export function RegisterModel(config: {
  name?: string;
  properties: PropertyRepresentation[];
}): ClassDecorator {
  return (target) => {
    const modelName = config.name || target.name;
    defineModel(modelName, config.properties);
    return target as typeof target;
  };
}
