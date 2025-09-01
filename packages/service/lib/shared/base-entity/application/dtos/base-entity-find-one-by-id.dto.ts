import { TObject, Type } from "@sinclair/typebox";

export const FindOneByIdInputSchemaCustom = <T extends TObject>(schema: T) => {
  return Type.Object(
    {
      id: Type.Index(schema, ["id"]),
      selection: Type.Optional(Type.Array(Type.String())),
    },
    {
      description: `DTO de entrada para busca de ${schema.$id} pelo id.`,
    },
  );
};

export const FindOneByIdOutputSchemaCustom = <T extends TObject>(schema: T) => {
  return Type.Composite([schema], {
    description: `DTO de saída para busca de ${schema.$id} pelo id.`,
  });
};
