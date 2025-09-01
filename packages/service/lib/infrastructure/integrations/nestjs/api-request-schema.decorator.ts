import { applyDecorators } from "@nestjs/common";
import { ApiParam, ApiQuery } from "@nestjs/swagger";
import { TObject, Type, TypeGuard } from "@sinclair/typebox";

export const ApiRequestSchema = (requestRepresentationSchema: TObject) => {
  const decorators: MethodDecorator[] = [];

  const query = Type.Index(requestRepresentationSchema, ["query"]);

  if (TypeGuard.IsObject(query)) {
    for (const [key, schema] of Object.entries(query.properties)) {
      decorators.push(
        ApiQuery({
          name: key,
          schema: schema,
          required: query.required?.includes(key) ?? false,
          description: schema.description ?? "Sem documentação.",
        }),
      );
    }
  }

  const params = Type.Index(requestRepresentationSchema, ["params"]);

  if (TypeGuard.IsObject(params)) {
    for (const [key, schema] of Object.entries(params)) {
      decorators.push(
        ApiParam({
          name: key,
          schema: schema,
          required: schema.required ?? false,
          description: schema.description ?? "Sem documentação.",
        }),
      );
    }
  }

  return applyDecorators(...decorators);
};
