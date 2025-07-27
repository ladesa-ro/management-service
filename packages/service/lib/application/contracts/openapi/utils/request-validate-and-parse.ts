import * as SwaggerParser from "@apidevtools/swagger-parser";
import addFormats from "ajv-formats";
import OpenAPIBackend from "openapi-backend";
import { ValidationFailedException } from "@/application/contracts";
import { AppApiDoc } from "@/application/contracts/openapi/document/app-openapi-document";
import { IAppRequestRepresentationGeneric } from "@/application/interfaces/i-app-request-representation-generic";

const openApiBackend = new OpenAPIBackend({
  definition: AppApiDoc,

  validate: true,
  coerceTypes: true,

  customizeAjv: (ajv) => {
    addFormats(ajv, { mode: "full" });

    ajv.addFormat("uint16", {
      type: "number",
      validate: (x) => Number.isInteger(x) && x >= 0 && x <= 2 ** 16 - 1,
    });

    ajv.addFormat("uint8", {
      type: "number",
      validate: (x) => Number.isInteger(x) && x >= 0 && x <= 2 ** 8 - 1,
    });

    return ajv;
  },
});

console.log("carregando especificação do openapi, por favor aguarde...");
await openApiBackend.init();
const api = await SwaggerParser.validate(AppApiDoc);
console.log("API name: %s, Version: %s", api.info.title, api.info.version);

export const requestValidateAndParse = async (requestRepresentation: IAppRequestRepresentationGeneric) => {
  const result = openApiBackend.validateRequest(requestRepresentation);

  if (!result.valid) {
    throw new ValidationFailedException(result.errors);
  }

  return {
    parsed: result.coerced,
  };
};
