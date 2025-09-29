export const CampusOperationsDoc = {
  campusList: {
    operationId: "campusList",
    summary: "Rota que realiza a listagem de campi.",
    description: "Obtenha uma lista de campi cadastrados no sistema com base-entity em filtros personalizados.",
  },

  campusFindOneById: {
    operationId: "campusFindOneById",
    summary: "Rota que realiza a consulta de campus.",
    description: "Obtenha os dados de um campus com base no ID.",
  },

  campusUpdateOneById: {
    operationId: "campusUpdateOneById",
    summary: "Rota que realiza a atualização de campi.",
    description: "Atualize um campus com base no ID.",
  },

  campusDeleteOneById: {
    operationId: "campusDeleteOneById",
    summary: "Rota que realiza a remoção de campi.",
    description: "Remova um campus com base no ID.",
  },

  campusCreate: {
    operationId: "campusCreate",
    summary: "Rota que realiza a criação de campi.",
    description: "Crie um campus.",
  },
};
