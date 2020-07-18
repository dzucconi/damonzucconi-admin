/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArtworkAttributes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddArtworkMutation
// ====================================================

export interface AddArtworkMutation_add_artwork_artwork {
  __typename: "Artwork";
  id: string;
  slug: string;
}

export interface AddArtworkMutation_add_artwork {
  __typename: "AddArtworkMutationPayload";
  artwork: AddArtworkMutation_add_artwork_artwork;
}

export interface AddArtworkMutation {
  add_artwork: AddArtworkMutation_add_artwork | null;
}

export interface AddArtworkMutationVariables {
  attributes: ArtworkAttributes;
}
