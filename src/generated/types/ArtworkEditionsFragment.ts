/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkEditionsFragment
// ====================================================

export interface ArtworkEditionsFragment_editions {
  __typename: "Edition";
  id: string;
  state: string;
  collector: string | null;
  location: string | null;
  notes: string | null;
  is_attributable: boolean;
}

export interface ArtworkEditionsFragment {
  __typename: "Artwork";
  editions: ArtworkEditionsFragment_editions[];
}
