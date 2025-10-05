import type { Type } from "typebox";
import type { ListQueryInputDtoSchema, ListQueryOutputDtoSchema } from "@/shared/features/list/application/schemas";

export type ListQueryInputDto = Type.Static<typeof ListQueryInputDtoSchema>;
export type ListQueryOutputDto = Type.Static<typeof ListQueryOutputDtoSchema>;
