/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkLinksFragment
// ====================================================

export interface ArtworkLinksFragment_links {
  __typename: "Link";
  id: string;
  url: string;
  title: string | null;
  kind: string;
  state: string;
}

export interface ArtworkLinksFragment {
  __typename: "Artwork";
  id: string;
  links: ArtworkLinksFragment_links[];
}
