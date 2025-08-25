import { EstadoFindOneByIdInputDto, EstadoListInputDto } from "@/features/estado/application/dtos";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";

export const toEstadoListInputDto = (req: IAppRequest<"EstadoList">): EstadoListInputDto => {
  const page = typeof req.query?.page === "number" ? req.query.page : Number(req.query?.page ?? 1);
  const limit = typeof req.query?.limit === "number" ? req.query.limit : Number(req.query?.limit ?? 20);
  const search = (req.query?.search ?? "") as string;

  const sortByStrings = (req.query?.sortBy ?? []) as string[];
  const sortBy = Array.isArray(sortByStrings)
    ? sortByStrings
        .map((s) => {
          if (typeof s !== "string") return null;
          const [propertyRaw, orderRaw] = s.split(":");
          const property = (propertyRaw ?? "").trim();
          const orderUpper = (orderRaw ?? "ASC").toString().toUpperCase();
          const order = orderUpper === "DESC" ? "DESC" : "ASC";
          if (!property) return null;
          return { property, order } as EstadoListInputDto["sortBy"][number];
        })
        .filter((i): i is NonNullable<typeof i> => Boolean(i))
    : [];

  // No query/param for filters/selection in this route; provide safe defaults
  const filters = { mode: "$and", filters: [] } as EstadoListInputDto["filters"];

  return {
    page,
    limit,
    search,
    sortBy,
    filters,
    selection: undefined,
  } as EstadoListInputDto;
};

export const toEstadoFindOneByIdInputDto = (req: IAppRequest<"EstadoFindOneById">): EstadoFindOneByIdInputDto => {
  const idValue = (req.params as any)?.id;
  const id = typeof idValue === "number" ? idValue : Number(idValue);

  return {
    id,
    selection: undefined,
  } as unknown as EstadoFindOneByIdInputDto;
};
