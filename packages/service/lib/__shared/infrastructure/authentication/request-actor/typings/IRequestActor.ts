import { type IDomain } from "@/legacy/domain/contracts/integration";

export type IRequestActor = null | Pick<IDomain.Usuario, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
