import { type IDomain } from "@/shared-antigo/tsp/schema/typings";

export type IRequestActor = null | Pick<IDomain.Usuario, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
