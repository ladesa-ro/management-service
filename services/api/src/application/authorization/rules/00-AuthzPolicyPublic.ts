import { IBaseAuthzFilterFn } from "@/application/authorization/rules/types";
import { BaseAuthzPolicy } from "./BaseAuthzPolicy";

const filterAllowNotDeleted: IBaseAuthzFilterFn<any, any> = (_context, alias = "row") => {
  return (qb) => {
    qb.where(`${alias}.dateDeleted IS NULL`);
  };
};

export class AuthzPolicyPublic extends BaseAuthzPolicy {
  constructor() {
    super({
      endereco: {
        find: filterAllowNotDeleted,
      },

      diario: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      estado: {
        find: true,
      },

      cidade: {
        find: true,
      },

      campus: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      bloco: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      ambiente: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      reserva: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      usuario: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      modalidade: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      curso: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      disciplina: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      turma: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      vinculo: {
        find: filterAllowNotDeleted,
      },

      calendarioLetivo: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      etapa: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      aula: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      diaCalendario: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      evento: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      diarioProfessor: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      diarioPreferenciaAgrupamento: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      horarioGerado: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },

      horarioGeradoAula: {
        create: true,
        find: filterAllowNotDeleted,
        update: filterAllowNotDeleted,
        delete: filterAllowNotDeleted,
      },
    });
  }
}
