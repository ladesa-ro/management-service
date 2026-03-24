import type { DeepPartial } from "typeorm";
import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IEstagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import { dateToISO } from "@/shared/mapping/transforms";
import type { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

export const estagiarioEntityDomainMapper = createEntityDomainMapper<
  IEstagiario,
  DeepPartial<EstagiarioTypeormEntity>,
  EstagiarioFindOneQueryResult
>({
  fields: [
    "id",
    "telefone",
    "emailInstitucional",
    { field: "perfil", type: "relation" },
    { field: "curso", type: "relation" },
    { field: "turma", type: "relation" },
    { field: "dataNascimento", type: "date-only" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
  output: [
    "id",
    "telefone",
    "emailInstitucional",
    "perfil",
    "curso",
    "turma",
    [
      "dataNascimento",
      "dataNascimento",
      (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    ],
    ["dateCreated", "dateCreated", dateToISO],
    ["dateUpdated", "dateUpdated", dateToISO],
    ["dateDeleted", "dateDeleted", dateToISO],
    ["dateDeleted", "ativo", (v) => !v],
  ],
});
