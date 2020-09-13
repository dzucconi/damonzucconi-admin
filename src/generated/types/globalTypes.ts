/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum State {
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  SELECTED = "SELECTED",
}

export enum SupportedUpload {
  GIF = "GIF",
  JPEG = "JPEG",
  PNG = "PNG",
}

export interface ArtworkAttributes {
  title: string;
  year: number;
  state: State;
  description?: string | null;
  gloss?: string | null;
  material?: string | null;
  duration?: string | null;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  unit?: string | null;
}

export interface UpdateArtworkAttributes {
  title?: string | null;
  year?: number | null;
  state?: State | null;
  description?: string | null;
  gloss?: string | null;
  material?: string | null;
  duration?: string | null;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  unit?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
