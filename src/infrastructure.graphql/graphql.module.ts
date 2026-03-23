import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import type { GraphQLFormattedError } from "graphql";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { buildStandardizedErrorResponse } from "@/server/nest/filters/error-response.mapper";
import { getNowISO } from "@/utils/date";

/**
 * Extrai a exceção original de um erro GraphQL.
 * Apollo wrapa exceções em GraphQLError — o original fica em `originalError`.
 */
function extractOriginalError(error: unknown): unknown {
  if (error && typeof error === "object" && "originalError" in error) {
    return (error as { originalError: unknown }).originalError ?? null;
  }
  return null;
}

/**
 * Formata erros GraphQL para o shape padronizado do projeto.
 * Garante que REST e GraphQL retornam a mesma estrutura de erro.
 */
function formatError(formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError {
  const originalError = extractOriginalError(error);

  // Erros nativos do GraphQL (query mal-formada, campo desconhecido, etc.)
  if (!originalError) {
    return {
      message: formattedError.message,
      locations: formattedError.locations,
      path: formattedError.path,
      extensions: {
        statusCode: 400,
        code: "GRAPHQL.VALIDATION",
        message: formattedError.message,
        timestamp: getNowISO(),
      },
    };
  }

  const graphqlPath = formattedError.path?.join(".");
  const errorPayload = buildStandardizedErrorResponse(originalError, graphqlPath);

  return {
    message: errorPayload.message,
    locations: formattedError.locations,
    path: formattedError.path,
    extensions: {
      statusCode: errorPayload.statusCode,
      code: errorPayload.code,
      message: errorPayload.message,
      timestamp: errorPayload.timestamp,
      ...(errorPayload.details ? { details: errorPayload.details } : {}),
    },
  };
}

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [IRuntimeOptionsToken],
      useFactory: (runtimeOptions: IRuntimeOptions) => {
        const prefix = runtimeOptions.prefix || "";
        const graphqlPath = "graphql";

        const fullPath = prefix ? `${prefix}${graphqlPath}` : graphqlPath;

        return {
          autoSchemaFile: true,
          sortSchema: true,

          path: graphqlPath,

          buildSchemaOptions: {
            numberScalarMode: "integer",
          },

          graphiql: {
            url: fullPath,
          },

          introspection: true,
          useGlobalPrefix: true,

          includeStacktraceInErrorResponses: false,
          formatError,

          cache: new InMemoryLRUCache({
            maxSize: Math.pow(2, 20) * 100,
            ttl: 5 * 60 * 1000,
          }),
        };
      },
    }),
  ],
})
export class GraphqlModule {}
