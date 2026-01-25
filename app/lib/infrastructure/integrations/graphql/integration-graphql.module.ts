import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import * as path from "node:path";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      autoSchemaFile: true,
      sortSchema: true,

      buildSchemaOptions: {
        numberScalarMode: "integer",
      },

      graphiql: true,

      introspection: true,
      useGlobalPrefix: true,

      cache: new InMemoryLRUCache({
        maxSize: Math.pow(2, 20) * 100,
        ttl: 5 * 60 * 1000,
      }),
    }),
  ],
})
export class IntegrationGraphQLModule {}
