import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { CampusCreateSchema, CampusSchema, CampusUpdateSchema } from "./campus.schemas";

export type ICampus = z.infer<typeof CampusSchema>;

export class Campus {
  static readonly entityName = "Campus";

  id!: IdUuid;
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: ICampus["endereco"];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Campus {
    const parsed = zodValidate(Campus.entityName, CampusCreateSchema.domain, dados);

    const instance = new Campus();

    instance.id = generateUuidV7();
    instance.nomeFantasia = parsed.nomeFantasia;
    instance.razaoSocial = parsed.razaoSocial;
    instance.apelido = parsed.apelido;
    instance.cnpj = parsed.cnpj;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Campus {
    const parsed = zodValidate(Campus.entityName, CampusSchema, dados);

    const instance = new Campus();

    instance.id = parsed.id;
    instance.nomeFantasia = parsed.nomeFantasia;
    instance.razaoSocial = parsed.razaoSocial;
    instance.apelido = parsed.apelido;
    instance.cnpj = parsed.cnpj;
    instance.endereco = parsed.endereco;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Campus.entityName, CampusUpdateSchema.domain, dados);

    if (parsed.nomeFantasia !== undefined) this.nomeFantasia = parsed.nomeFantasia;
    if (parsed.razaoSocial !== undefined) this.razaoSocial = parsed.razaoSocial;
    if (parsed.apelido !== undefined) this.apelido = parsed.apelido;
    if (parsed.cnpj !== undefined) this.cnpj = parsed.cnpj;

    this.dateUpdated = getNowISO();

    zodValidate(Campus.entityName, CampusSchema, this);
  }

  isCnpjValido(): boolean {
    const cnpjLimpo = this.cnpj.replace(/\D/g, "");
    return /^\d{14}$/.test(cnpjLimpo);
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
