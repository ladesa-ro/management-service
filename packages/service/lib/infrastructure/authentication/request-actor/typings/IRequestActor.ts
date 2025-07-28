import { type IDomain } from "@/domain/contracts/integration";

export type IRequestActor = null | Pick<IDomain.Usuario, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
