import { type IDomain } from "@/shared/tsp/schema/typings";

export type IRequestActor = null | Pick<IDomain.Usuario, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
