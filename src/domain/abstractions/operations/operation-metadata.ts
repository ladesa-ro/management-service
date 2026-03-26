/**
 * OperationMetadata — metadados de operacoes (commands/queries) do dominio.
 *
 * Cada operacao recebe operationId, summary e description.
 * .swaggerMetadata gera os campos para @ApiOperation do NestJS/Swagger.
 * .gqlMetadata gera name/description para resolvers GraphQL.
 *
 * Uso: instanciar via createOperationMetadata() nos *.handler.interface.ts.
 */

export interface ISwaggerOperationMetadata {
  operationId: string;
  summary: string;
  description: string;
}

export interface IGqlOperationMetadata {
  name: string;
  description: string;
}

export interface IOperationMetadataInput {
  operationId: string;
  summary: string;
  description?: string;
}

export class OperationMetadata {
  readonly operationId: string;
  readonly summary: string;
  readonly description: string;

  constructor(input: IOperationMetadataInput) {
    this.operationId = input.operationId;
    this.summary = input.summary;
    this.description = input.description ?? input.summary;
  }

  get swaggerMetadata(): ISwaggerOperationMetadata {
    return {
      operationId: this.operationId,
      summary: this.summary,
      description: this.description,
    };
  }

  get gqlMetadata(): IGqlOperationMetadata {
    return {
      name: this.operationId,
      description: this.summary,
    };
  }
}

export function createOperationMetadata(input: IOperationMetadataInput): OperationMetadata {
  return new OperationMetadata(input);
}
