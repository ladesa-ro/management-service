import * as IDomainContracts from "@ladesa-ro/especificacao";

export type IRequestActor = null | Pick<IDomainContracts.Usuario, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
