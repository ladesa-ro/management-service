import type { Type } from "typebox";
import type { EstadoListRoute } from "@/features/estado/presentation/rest/routes";

export type EstadoListRequestDto = Type.Static<typeof EstadoListRoute.requestSchema>;
