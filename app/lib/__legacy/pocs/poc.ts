// @ts-nocheck

import * as path from "node:path";
import * as process from "node:process";
import { CompilerHost, compile, getTypeName, IntrinsicType, Namespace, NodeHost, Program, resolveCompilerOptions, Type } from "@typespec/compiler";
import { SyntaxKind } from "@typespec/compiler/ast";
import { lazyAsync } from "@/infrastructure/utils/lazy";

const findNamespace = (program: Program, fullName: string) => {
  let currentNs = program.getGlobalNamespaceType();

  for (const part of fullName.split(".")) {
    if (!currentNs.namespaces) return undefined;

    const next = currentNs.namespaces.get(part);

    if (!next) return undefined;
    currentNs = next;
  }

  return currentNs;
};

const getNamespaceQualifiedModels = function* (namespace: Namespace) {
  for (const model of namespace.models.values()) {
    if (!model.name) continue;
    if (model.node?.kind !== SyntaxKind.ModelStatement) continue;

    yield model;
  }
};

const compileProgram = async () => {
  const host: CompilerHost = NodeHost;

  // Chama o compile passando o código como string
  // const source = fs.readFileSync(, "utf-8");
  const pathToMainTsp = path.resolve(__dirname, "../../main.tsp");

  const [compilerOptions, _diagnostics] = await resolveCompilerOptions(host, {
    cwd: process.cwd(),
    entrypoint: pathToMainTsp,
    // overrides,
  });

  const program = await compile(host, pathToMainTsp, {
    ...compilerOptions,
    noEmit: true,
  });

  return program;
};

const isNull = (type: Type): type is IntrinsicType & { name: "null" } => {
  return type.kind === "Intrinsic" && type.name === "null";
};

export type IPropertyRepresentation = {
  name: string;
  nullable: boolean;
  optional: boolean;
} & (
  | { mode: "simple" }
  | {
      mode: "reference";
      reference: {
        name: string;
      };
    }
);

export type IModelRepresentation = {
  name: string;
  properties: IPropertyRepresentation[];
};

export const compileDomainModels = lazyAsync(async () => {
  const program = await compileProgram();

  const allowedNamespaces = ["Ladesa.ManagementService"];

  const getAllowedNamespaces = function* () {
    for (const allowedNamespace of allowedNamespaces) {
      const namespace = findNamespace(program, allowedNamespace);
      if (!namespace) continue;
      yield namespace;
    }
  };

  const getAllowedNamespacesModels = function* () {
    for (const namespace of getAllowedNamespaces()) {
      for (const model of getNamespaceQualifiedModels(namespace)) {
        yield { model, namespace };
      }
    }
  };

  const getModelsRepresentations = function* () {
    for (const { model } of getAllowedNamespacesModels()) {
      const modelRepresentation: IModelRepresentation = {
        name: model.name,
        properties: [],
      };

      for (const property of model.properties.values()) {
        const name = property.name;
        const optional = property.optional;

        if (!name) continue;

        let nullable = false;
        let cursor = property.type;

        const isValidCursorFinalType = (cursor: Type) => {
          switch (cursor.kind) {
            case "Scalar":
            case "String": {
              return true;
            }

            case "Model": {
              return cursor.name !== "Array";
            }

            default: {
              return false;
            }
          }
        };

        while (!isValidCursorFinalType(cursor)) {
          switch (cursor.kind) {
            case "Model": {
              if (cursor.name === "Array") {
                const typeOrValue = cursor.decorators[0].args[1].value;

                if (typeOrValue.entityKind === "Type") {
                  cursor = typeOrValue;
                  continue;
                }
              }

              throw new Error("Array with non-model type is not supported");
            }

            case "ModelProperty": {
              cursor = cursor.type;
              continue;
            }

            case "Union": {
              const variants = Array.from(cursor.variants.values()).map((variant) => variant.type);

              if (variants.length === 1) {
                cursor = variants[0];
                continue;
              }

              if (variants.length === 2) {
                const [first, second] = variants;

                const isFirstNull = isNull(first);
                const isSecondNull = isNull(second);

                const isBothNull = isFirstNull && isSecondNull;

                if (!isBothNull) {
                  if (isFirstNull) {
                    nullable = true;
                    cursor = second;
                    continue;
                  } else {
                    nullable = true;
                    cursor = first;
                    continue;
                  }
                }
              }

              const isUniformKinds = variants.every((variant) => variant.kind === variants[0].kind);

              if (isUniformKinds) {
                cursor = variants[0];
                continue;
              }

              console.log(variants);
              console.debug(getTypeName(cursor));
              throw new Error("Union with more than 2 variants is not supported");
            }
            default: {
              console.debug(cursor.kind, getTypeName(cursor));
              throw new Error("Unsupported type");
            }
          }
        }

        let propertyRepresentation: IPropertyRepresentation;

        if (cursor.kind === "Model") {
          propertyRepresentation = {
            name,
            nullable,
            optional,
            mode: "reference",
            reference: {
              name: cursor.name,
            },
          };
        } else {
          propertyRepresentation = {
            name,
            nullable,
            optional,
            mode: "simple",
          };
        }

        modelRepresentation.properties.push(propertyRepresentation);
      }

      yield modelRepresentation;
    }
  };

  const modelsRepresentations = Array.from(getModelsRepresentations());

  return {
    modelsRepresentations,
    getModelRepresentation: (name: string) => {
      const modelRepresentation = modelsRepresentations.find((modelRepresentation) => modelRepresentation.name === name);
      if (!modelRepresentation) throw new Error(`Model ${name} not found`);
      return modelRepresentation;
    },
  };
});
