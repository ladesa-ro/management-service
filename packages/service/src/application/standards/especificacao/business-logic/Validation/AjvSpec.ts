import { getSpecNodesStore } from "@/application/standards/especificacao/business-logic/SpecNodesStore";
import addFormats from "ajv-formats";
import Ajv from "ajv/dist/2020";

const ajvSpec = new Ajv({
  coerceTypes: "array",
  useDefaults: true,
  removeAdditional: true,

  strict: "log",
  strictTypes: false,
  allowUnionTypes: false,
});

let setup = false;

const logKeywords = new Set<string>();

const setupAjvSpec = async () => {
  if (setup) return;

  addFormats(ajvSpec);

  const ignoreds = ["x-unispec-entity-id", "x-unispec-kind", "x-unispec-http-key", "x-unispec-gql-key"];

  for (const ignored of ignoreds) {
    ajvSpec.addKeyword({
      keyword: ignored,
      code() {},
    });
  }

  // TODO
  const toImplement = ["x-unispec-constraint-entity-exists", "x-unispec-constraint-cep"];

  for (const keywork of toImplement) {
    ajvSpec.addKeyword({
      keyword: keywork,
      code() {
        if (!logKeywords.has(keywork)) {
          console.error(`TODO: validate keyword ${keywork}`);

          logKeywords.add(keywork);
        }
      },
    });
  }

  const store = getSpecNodesStore();

  for (const node of store.Nodes) {
    ajvSpec.addSchema(node);
  }

  setup = true;
};

export const getAjvSpec = async () => {
  await setupAjvSpec();
  return ajvSpec;
};
