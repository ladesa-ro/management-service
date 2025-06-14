using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

enum AuthorizationAction {
  `ambiente:find`,
  `ambiente:create`,
}

model Authorization is EntityBase {
  `ambiente:create`: AmbienteCreateInput;
  `ambiente:find`: AmbienteFindOneInput;
  `ambiente:update`: AmbienteUpdateInput;
  `ambiente:delete`: AmbienteFindOneInput;
}
