/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkEmbedsFragment
// ====================================================

export interface ArtworkEmbedsFragment_embeds {
  __typename: "Embed";
  id: string;
  html: string | null;
}

export interface ArtworkEmbedsFragment {
  __typename: "Artwork";
  id: string;
  embeds: ArtworkEmbedsFragment_embeds[];
}
