import type { Static } from "typebox";
import type { RequestRepresentationDtoSchema } from "@/shared/presentation/http/request-representation.schema.ts";

export type RequestRepresentationDto = Static<typeof RequestRepresentationDtoSchema>;
