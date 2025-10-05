import type { Type } from "typebox";
import type { EstadoFindOneByIdRoute } from "@/features/estado/presentation/rest/routes";

export type EstadoFindOneByIdRequestDto = Type.Static<typeof EstadoFindOneByIdRoute.requestSchema>;
