import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import type {
  EstagioSolicitacaoSituacao,
  EstagioSolicitacaoTipo,
} from "./estagio-solicitacao.fields";
import { EstagioSolicitacaoSchema } from "./estagio-solicitacao.schemas";

export type IEstagioSolicitacao = z.infer<typeof EstagioSolicitacaoSchema>;

export class EstagioSolicitacao {
  static readonly entityName = "EstagioSolicitacao";

  id!: IdUuid;
  tipo!: EstagioSolicitacaoTipo;
  situacao!: EstagioSolicitacaoSituacao;
  estagiario!: ObjectUuidRef;
  campus!: ObjectUuidRef;
  professorOrientador!: ObjectUuidRef | null;
  localInterno!: string | null;
  descricaoAtividades!: string | null;
  empresa!: ObjectUuidRef | null;
  empresaRazaoSocial!: string | null;
  empresaNomeFantasia!: string | null;
  empresaCnpj!: string | null;
  empresaTelefone!: string | null;
  empresaEmail!: string | null;
  supervisorNome!: string | null;
  supervisorEmail!: string | null;
  supervisorTelefone!: string | null;
  analista!: ObjectUuidRef | null;
  parecerAnalise!: string | null;
  dataAnalise!: ScalarDateTimeString | null;
  estagioGerado!: ObjectUuidRef | null;

  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  static createInterno(dados: {
    estagiarioId: string;
    campusId: string;
    professorOrientadorId: string;
    localInterno: string;
    descricaoAtividades: string;
  }): EstagioSolicitacao {
    const instance = new EstagioSolicitacao();
    const now = getNowISO();

    instance.id = generateUuidV7();
    instance.tipo = "INTERNO";
    instance.situacao = "PENDENTE";
    instance.estagiario = { id: dados.estagiarioId };
    instance.campus = { id: dados.campusId };
    instance.professorOrientador = { id: dados.professorOrientadorId };
    instance.localInterno = dados.localInterno;
    instance.descricaoAtividades = dados.descricaoAtividades;
    instance.empresa = null;
    instance.empresaRazaoSocial = null;
    instance.empresaNomeFantasia = null;
    instance.empresaCnpj = null;
    instance.empresaTelefone = null;
    instance.empresaEmail = null;
    instance.supervisorNome = null;
    instance.supervisorEmail = null;
    instance.supervisorTelefone = null;
    instance.analista = null;
    instance.parecerAnalise = null;
    instance.dataAnalise = null;
    instance.estagioGerado = null;

    instance.dateCreated = now;
    instance.dateUpdated = now;
    instance.dateDeleted = null;

    return instance;
  }

  static createExterno(dados: {
    estagiarioId: string;
    campusId: string;
    empresa: {
      razaoSocial: string;
      nomeFantasia?: string | null;
      cnpj: string;
      email?: string | null;
      telefone?: string | null;
    };
    supervisor: {
      nome: string;
      email?: string | null;
      telefone?: string | null;
    };
  }): EstagioSolicitacao {
    const instance = new EstagioSolicitacao();
    const now = getNowISO();

    instance.id = generateUuidV7();
    instance.tipo = "EXTERNO";
    instance.situacao = "PENDENTE";
    instance.estagiario = { id: dados.estagiarioId };
    instance.campus = { id: dados.campusId };
    instance.professorOrientador = null;
    instance.localInterno = null;
    instance.descricaoAtividades = null;
    instance.empresa = null;
    instance.empresaRazaoSocial = dados.empresa.razaoSocial;
    instance.empresaNomeFantasia = dados.empresa.nomeFantasia ?? null;
    instance.empresaCnpj = dados.empresa.cnpj;
    instance.empresaEmail = dados.empresa.email ?? null;
    instance.empresaTelefone = dados.empresa.telefone ?? null;
    instance.supervisorNome = dados.supervisor.nome;
    instance.supervisorEmail = dados.supervisor.email ?? null;
    instance.supervisorTelefone = dados.supervisor.telefone ?? null;
    instance.analista = null;
    instance.parecerAnalise = null;
    instance.dataAnalise = null;
    instance.estagioGerado = null;

    instance.dateCreated = now;
    instance.dateUpdated = now;
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): EstagioSolicitacao {
    const parsed = zodValidate(EstagioSolicitacao.entityName, EstagioSolicitacaoSchema, dados);

    const instance = new EstagioSolicitacao();

    instance.id = parsed.id;
    instance.tipo = parsed.tipo as EstagioSolicitacaoTipo;
    instance.situacao = parsed.situacao as EstagioSolicitacaoSituacao;
    instance.estagiario = parsed.estagiario;
    instance.campus = parsed.campus;
    instance.professorOrientador = parsed.professorOrientador;
    instance.localInterno = parsed.localInterno;
    instance.descricaoAtividades = parsed.descricaoAtividades;
    instance.empresa = parsed.empresa;
    instance.empresaRazaoSocial = parsed.empresaRazaoSocial;
    instance.empresaNomeFantasia = parsed.empresaNomeFantasia;
    instance.empresaCnpj = parsed.empresaCnpj;
    instance.empresaTelefone = parsed.empresaTelefone;
    instance.empresaEmail = parsed.empresaEmail;
    instance.supervisorNome = parsed.supervisorNome;
    instance.supervisorEmail = parsed.supervisorEmail;
    instance.supervisorTelefone = parsed.supervisorTelefone;
    instance.analista = parsed.analista;
    instance.parecerAnalise = parsed.parecerAnalise;
    instance.dataAnalise = parsed.dataAnalise;
    instance.estagioGerado = parsed.estagioGerado;

    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  deferir(
    analistaId: string,
    estagioId: string,
    empresaId?: string | null,
    parecer?: string | null,
  ): void {
    this.situacao = "DEFERIDA";
    this.analista = { id: analistaId };
    this.estagioGerado = { id: estagioId };
    if (empresaId) {
      this.empresa = { id: empresaId };
    }
    this.parecerAnalise = parecer ?? null;
    this.dataAnalise = getNowISO();
    this.dateUpdated = getNowISO();
  }

  indeferir(analistaId: string, parecer: string): void {
    this.situacao = "INDEFERIDA";
    this.analista = { id: analistaId };
    this.parecerAnalise = parecer;
    this.dataAnalise = getNowISO();
    this.dateUpdated = getNowISO();
  }

  cancelar(): void {
    this.situacao = "CANCELADA";
    this.dateUpdated = getNowISO();
  }
}
