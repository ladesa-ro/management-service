import "@typespec/http";

using Http;
using Ladesa.ManagementService.Domain.Contracts;

namespace Ladesa.ManagementService.Application.Contracts;

@route("/ambientes")
interface AmbientesController {
  findById(@path id: AmbienteFindOneInput.id): AmbienteFindOneOutput;

  create(@body body: AmbienteCreateInput): AmbienteFindOneOutput;

  update(
    @path id: AmbienteFindOneInput.id,
    @body body: AmbienteUpdateInput,
  ): AmbienteFindOneOutput;

  delete(@path body: AmbienteFindOneInput.id): AmbienteFindOneOutput;
}
