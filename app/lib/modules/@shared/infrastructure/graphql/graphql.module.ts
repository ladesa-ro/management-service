import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [CONFIG_PORT],
      useFactory: (configService: IConfigPort) => {
        const prefix = configService.getRuntimePrefix() || "";
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
