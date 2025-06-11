import "@typespec/json-schema";

import "../../domain/contracts/main.tsp";

import "./resources/ambiente.endpoint.tsp";

@service(#{ title: "Serviço de Gerenciamento - Ladesa" })
namespace Ladesa.ManagementService.Application.Contracts;
