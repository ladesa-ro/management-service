import { Type } from "typebox";

export const RequestRepresentationDtoSchema = Type.Object({
  ip: Type.Optional(Type.String()),
  ips: Type.Array(Type.String()),

  protocol: Type.String(),
  hostname: Type.String(),

  method: Type.String(),
  path: Type.String(),
  headers: Type.Record(Type.String(), Type.Any()),

  params: Type.Optional(Type.Any()),

  query: Type.Optional(Type.Any()),
  body: Type.Optional(Type.Any()),
});
