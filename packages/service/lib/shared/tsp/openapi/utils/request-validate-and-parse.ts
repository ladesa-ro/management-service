import SwaggerParser from "@apidevtools/swagger-parser";
import addFormats from "ajv-formats";
import OpenAPIBackend from "openapi-backend";
import { IAppRequestRepresentationGeneric } from "@/__legacy/interfaces/i-app-request-representation-generic";
import { ValidationFailedException } from "@/shared";
import { lazyAsync } from "@/shared/infrastructure/utils/lazy";
import { AppApiDocAny } from "@/shared/tsp/openapi/document/app-openapi-document";

const getOpenApiBackend = lazyAsync(async () => {
  const openApiBackend = new OpenAPIBackend({
    definition: AppApiDocAny,

    validate: true,
    coerceTypes: true,
    quick: true,

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
  console.log("carregado com sucesso!");

  return openApiBackend;
});

export const getSwaggerDoc = lazyAsync(async () => {
  const api = await Promise.resolve(SwaggerParser.validate(AppApiDocAny));
  console.log("API name: %s, Version: %s", api.info.title, api.info.version);
  return api;
});

export const requestValidateAndParse = async (requestRepresentation: IAppRequestRepresentationGeneric) => {
  const openApiBackend = await getOpenApiBackend();

  const result = openApiBackend.validateRequest(requestRepresentation);

  if (!result.valid) {
    throw new ValidationFailedException(result.errors);
  }

  return {
    parsed: result.coerced,
  };
};
