/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedUpload } from "./globalTypes";

// ====================================================
// GraphQL query operation: FilesUploaderQuery
// ====================================================

export interface FilesUploaderQuery {
  presigned_upload_urls: string[];
}

export interface FilesUploaderQueryVariables {
  fileTypes: SupportedUpload[];
}
