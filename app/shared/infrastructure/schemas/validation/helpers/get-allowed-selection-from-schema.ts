import type { TObject } from "typebox";
import type { SchemaRegistry } from "@/shared";
import { getAllowedSelection } from "./get-allowed-selection";
import { getSelectionFromTypeboxSchemaObject } from "./get-selection-from-typebox-schema-object";

export const getAllowedSelectionFromSchema = (schemaRegistry: SchemaRegistry, schema: TObject, requestedSelection: string[] | null = null) => {
  return getAllowedSelection(getSelectionFromTypeboxSchemaObject(schemaRegistry, schema), requestedSelection);
};
