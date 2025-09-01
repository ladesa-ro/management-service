import { TObject } from "@sinclair/typebox";
import { getAllowedSelection } from "@/shared/base-entity/application/helpers/get-allowed-selection";
import { getSelectionFromTypeboxSchemaObject } from "@/shared/base-entity/application/helpers/get-selection-from-typebox-schema-object";

export const getAllowedSelectionFromSchema = (schema: TObject, requestedSelection: string[] | null = null) => {
  return getAllowedSelection(getSelectionFromTypeboxSchemaObject(schema), requestedSelection);
};
