import type { DeepPartial } from "typeorm";
import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IEmpresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQueryResult } from "@/modules/estagio/empresa/domain/queries";
import { dateToISO } from "@/shared/mapping/transforms";
import type { EmpresaTypeormEntity } from "./empresa.typeorm.entity";

export const empresaEntityDomainMapper = createEntityDomainMapper<
  IEmpresa,
  DeepPartial<EmpresaTypeormEntity>,
  EmpresaFindOneQueryResult
>({
  fields: [
    "id",
    "razaoSocial",
    "nomeFantasia",
    "cnpj",
    "telefone",
    "email",
    { field: "endereco", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
  output: [
    "id",
    "razaoSocial",
    "nomeFantasia",
    "cnpj",
    "telefone",
    "email",
    "endereco",
    ["dateCreated", "dateCreated", dateToISO],
    ["dateUpdated", "dateUpdated", dateToISO],
    ["dateDeleted", "dateDeleted", dateToISO],
    ["dateDeleted", "ativo", (v) => !v],
  ],
});
