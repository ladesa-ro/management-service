import type { TObject } from "typebox";
import { getAllowedSelection } from "./get-allowed-selection";
import { getSelectionFromTypeboxSchemaObject } from "./get-selection-from-typebox-schema-object";

export const getAllowedSelectionFromSchema = (schema: TObject, requestedSelection: string[] | null = null) => {
  return getAllowedSelection(getSelectionFromTypeboxSchemaObject(schema), requestedSelection);
};
