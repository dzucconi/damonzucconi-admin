/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArtworkIndexPageQuery
// ====================================================

export interface ArtworkIndexPageQuery_artworks {
  __typename: "Artwork";
  id: string;
  state: string;
  slug: string;
  title: string;
}

export interface ArtworkIndexPageQuery {
  artworks: ArtworkIndexPageQuery_artworks[];
}
