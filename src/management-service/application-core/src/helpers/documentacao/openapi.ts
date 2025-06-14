import ApiDocSchema from "@ladesa-ro/management-management-service.application.contracts/openapi-v3-schema";
import type * as ApiDocTypings from "@ladesa-ro/management-management-service.application.contracts/openapi-v3-typings";

export { ApiDocSchema };
export type { ApiDocTypings };

type OperacaoGenerica = ApiDocTypings.paths[keyof ApiDocTypings.paths][keyof ApiDocTypings.paths[keyof ApiDocTypings.paths]];

export type IRotaRetorno<Rota extends OperacaoGenerica> = Rota["responses"]["200"]["content"][keyof Rota["responses"]["200"]["content"]]

export type IRotaEntrada<Rota extends OperacaoGenerica> = Pick<Rota, "parameters" | "requestBody">