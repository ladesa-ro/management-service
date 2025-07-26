import { BaseAuthzPolicy } from "./BaseAuthzPolicy";

export class AuthzPolicySuperUser extends BaseAuthzPolicy {
  constructor() {
    super({
      endereco: {
        find: true,
      },

      diario: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      estado: {
        find: true,
      },

      cidade: {
        find: true,
      },

      campus: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      bloco: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      ambiente: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      reserva: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      usuario: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      modalidade: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      curso: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      disciplina: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      turma: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      vinculo: {
        find: true,
      },

      calendarioLetivo: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },
      etapa: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },
      aula: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      diaCalendario: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      evento: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      diarioProfessor: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      diarioPreferenciaAgrupamento: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      horarioGerado: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },

      horarioGeradoAula: {
        create: true,
        find: true,
        update: true,
        delete: true,
      },
    });
  }
}
