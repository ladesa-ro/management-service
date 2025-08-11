import { AppApiDoc } from "@/application/contracts/openapi/document/app-openapi-document";
import { OpenApiToGraphQLSchema } from "@/openapi-to-graphql/open-api-to-graph-ql-schema";
import { printSchema } from "graphql";

async function poc() {
  const handler = new OpenApiToGraphQLSchema()
  const schema = await handler.buildSchemaForDocument(AppApiDoc);
  console.log(printSchema(schema));
}

await poc();