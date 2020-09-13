/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkShowPageArtworkFragment
// ====================================================

export interface ArtworkShowPageArtworkFragment_dimensions_inches {
  __typename: "Dimension";
  width: number | null;
  height: number | null;
  depth: number | null;
  unit: string | null;
}

export interface ArtworkShowPageArtworkFragment_dimensions {
  __typename: "Dimensions";
  inches: ArtworkShowPageArtworkFragment_dimensions_inches;
}

export interface ArtworkShowPageArtworkFragment_primaryImage_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkShowPageArtworkFragment_primaryImage_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkShowPageArtworkFragment_primaryImage_thumbnail_urls;
}

export interface ArtworkShowPageArtworkFragment_primaryImage {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkShowPageArtworkFragment_primaryImage_thumbnail;
}

export interface ArtworkShowPageArtworkFragment_images_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkShowPageArtworkFragment_images_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkShowPageArtworkFragment_images_thumbnail_urls;
}

export interface ArtworkShowPageArtworkFragment_images {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkShowPageArtworkFragment_images_thumbnail;
}

export interface ArtworkShowPageArtworkFragment_links {
  __typename: "Link";
  id: string;
  url: string;
  title: string | null;
  kind: string;
  state: string;
}

export interface ArtworkShowPageArtworkFragment_embeds {
  __typename: "Embed";
  id: string;
  html: string | null;
}

export interface ArtworkShowPageArtworkFragment_attachments {
  __typename: "Attachment";
  id: string;
  title: string | null;
  url: string;
  state: string;
}

export interface ArtworkShowPageArtworkFragment_editions {
  __typename: "Edition";
  id: string;
  state: string;
  collector: string | null;
  location: string | null;
  notes: string | null;
  is_attributable: boolean;
}

export interface ArtworkShowPageArtworkFragment {
  __typename: "Artwork";
  id: string;
  slug: string;
  state: string;
  title: string;
  year: number;
  material: string | null;
  dimensions: ArtworkShowPageArtworkFragment_dimensions | null;
  duration: string | null;
  gloss: string | null;
  description: string | null;
  primaryImage: ArtworkShowPageArtworkFragment_primaryImage[];
  images: ArtworkShowPageArtworkFragment_images[];
  links: ArtworkShowPageArtworkFragment_links[];
  embeds: ArtworkShowPageArtworkFragment_embeds[];
  attachments: ArtworkShowPageArtworkFragment_attachments[];
  editions: ArtworkShowPageArtworkFragment_editions[];
}
