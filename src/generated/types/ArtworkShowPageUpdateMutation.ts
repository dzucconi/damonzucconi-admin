/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateArtworkAttributes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ArtworkShowPageUpdateMutation
// ====================================================

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_dimensions_inches {
  __typename: "Dimension";
  width: number | null;
  height: number | null;
  depth: number | null;
  unit: string | null;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_dimensions {
  __typename: "Dimensions";
  inches: ArtworkShowPageUpdateMutation_update_artwork_artwork_dimensions_inches;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_primaryImage_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_primaryImage_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkShowPageUpdateMutation_update_artwork_artwork_primaryImage_thumbnail_urls;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_primaryImage {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkShowPageUpdateMutation_update_artwork_artwork_primaryImage_thumbnail;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_images_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_images_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkShowPageUpdateMutation_update_artwork_artwork_images_thumbnail_urls;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_images {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkShowPageUpdateMutation_update_artwork_artwork_images_thumbnail;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_links {
  __typename: "Link";
  id: string;
  url: string;
  title: string | null;
  kind: string;
  state: string;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_embeds {
  __typename: "Embed";
  id: string;
  html: string | null;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_attachments {
  __typename: "Attachment";
  id: string;
  title: string | null;
  url: string;
  state: string;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork_editions {
  __typename: "Edition";
  id: string;
  state: string;
  collector: string | null;
  location: string | null;
  notes: string | null;
  is_attributable: boolean;
}

export interface ArtworkShowPageUpdateMutation_update_artwork_artwork {
  __typename: "Artwork";
  id: string;
  slug: string;
  state: string;
  title: string;
  year: number;
  material: string | null;
  dimensions: ArtworkShowPageUpdateMutation_update_artwork_artwork_dimensions | null;
  duration: string | null;
  gloss: string | null;
  description: string | null;
  primaryImage: ArtworkShowPageUpdateMutation_update_artwork_artwork_primaryImage[];
  images: ArtworkShowPageUpdateMutation_update_artwork_artwork_images[];
  links: ArtworkShowPageUpdateMutation_update_artwork_artwork_links[];
  embeds: ArtworkShowPageUpdateMutation_update_artwork_artwork_embeds[];
  attachments: ArtworkShowPageUpdateMutation_update_artwork_artwork_attachments[];
  editions: ArtworkShowPageUpdateMutation_update_artwork_artwork_editions[];
}

export interface ArtworkShowPageUpdateMutation_update_artwork {
  __typename: "UpdateArtworkMutationPayload";
  artwork: ArtworkShowPageUpdateMutation_update_artwork_artwork;
}

export interface ArtworkShowPageUpdateMutation {
  update_artwork: ArtworkShowPageUpdateMutation_update_artwork | null;
}

export interface ArtworkShowPageUpdateMutationVariables {
  id: string;
  attributes: UpdateArtworkAttributes;
}
