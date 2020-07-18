/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkAttributesFragment
// ====================================================

export interface ArtworkAttributesFragment_dimensions_inches {
  __typename: "Dimension";
  width: number | null;
  height: number | null;
  depth: number | null;
  unit: string | null;
}

export interface ArtworkAttributesFragment_dimensions {
  __typename: "Dimensions";
  inches: ArtworkAttributesFragment_dimensions_inches;
}

export interface ArtworkAttributesFragment {
  __typename: "Artwork";
  id: string;
  slug: string;
  state: string;
  title: string;
  year: number;
  material: string | null;
  dimensions: ArtworkAttributesFragment_dimensions | null;
  duration: string | null;
  gloss: string | null;
  description: string | null;
}
