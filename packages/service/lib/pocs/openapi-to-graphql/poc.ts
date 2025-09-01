// @ts-nocheck

import { printSchema } from "graphql";
import { OpenApiToGraphQLSchema } from "@/pocs/openapi-to-graphql/open-api-to-graph-ql-schema";
import { AppApiDocAny } from "@/shared-antigo";

async function poc() {
  const handler = new OpenApiToGraphQLSchema();
  const schema = await handler.buildSchemaForDocument(AppApiDocAny);
  console.log(printSchema(schema));
}

await poc();
