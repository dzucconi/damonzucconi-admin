/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArtworkShowPageQuery
// ====================================================

export interface ArtworkShowPageQuery_artwork_dimensions_inches {
  __typename: "Dimension";
  width: number | null;
  height: number | null;
  depth: number | null;
  unit: string | null;
}

export interface ArtworkShowPageQuery_artwork_dimensions {
  __typename: "Dimensions";
  inches: ArtworkShowPageQuery_artwork_dimensions_inches;
}

export interface ArtworkShowPageQuery_artwork_primaryImage_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkShowPageQuery_artwork_primaryImage_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkShowPageQuery_artwork_primaryImage_thumbnail_urls;
}

export interface ArtworkShowPageQuery_artwork_primaryImage {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkShowPageQuery_artwork_primaryImage_thumbnail | null;
}

export interface ArtworkShowPageQuery_artwork_images_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkShowPageQuery_artwork_images_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkShowPageQuery_artwork_images_thumbnail_urls;
}

export interface ArtworkShowPageQuery_artwork_images {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkShowPageQuery_artwork_images_thumbnail | null;
}

export interface ArtworkShowPageQuery_artwork_links {
  __typename: "Link";
  id: string;
  url: string;
  title: string | null;
  kind: string;
  state: string;
}

export interface ArtworkShowPageQuery_artwork_embeds {
  __typename: "Embed";
  id: string;
  html: string | null;
}

export interface ArtworkShowPageQuery_artwork_attachments {
  __typename: "Attachment";
  id: string;
  title: string | null;
  url: string;
  state: string;
}

export interface ArtworkShowPageQuery_artwork_editions {
  __typename: "Edition";
  id: string;
  state: string;
  collector: string | null;
  location: string | null;
  notes: string | null;
  is_attributable: boolean;
}

export interface ArtworkShowPageQuery_artwork {
  __typename: "Artwork";
  id: string;
  slug: string;
  state: string;
  title: string;
  year: number;
  material: string | null;
  dimensions: ArtworkShowPageQuery_artwork_dimensions | null;
  duration: string | null;
  gloss: string | null;
  description: string | null;
  primaryImage: ArtworkShowPageQuery_artwork_primaryImage[];
  images: ArtworkShowPageQuery_artwork_images[];
  links: ArtworkShowPageQuery_artwork_links[];
  embeds: ArtworkShowPageQuery_artwork_embeds[];
  attachments: ArtworkShowPageQuery_artwork_attachments[];
  editions: ArtworkShowPageQuery_artwork_editions[];
}

export interface ArtworkShowPageQuery {
  /**
   * An artwork
   */
  artwork: ArtworkShowPageQuery_artwork;
}

export interface ArtworkShowPageQueryVariables {
  id: string;
}
