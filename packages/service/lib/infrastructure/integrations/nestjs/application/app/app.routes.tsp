import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

@tag("base")
@route("")
@get
op AppController_getHello(): Body<{
  service: "@ladesa-ro/api.service";
  status: "up";
  adoniranBarbosa: "chico buarque";

  @TypeSpec.JsonSchema.oneOf
  prefix?: string | unknown;

  @TypeSpec.JsonSchema.oneOf
  version: string;

  @TypeSpec.JsonSchema.oneOf
  buildTime?: utcDateTime;

  @TypeSpec.JsonSchema.oneOf
  gitCommitHash?: string | unknown;
}>;
