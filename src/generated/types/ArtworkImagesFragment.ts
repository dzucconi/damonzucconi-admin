/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkImagesFragment
// ====================================================

export interface ArtworkImagesFragment_images_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ArtworkImagesFragment_images_thumbnail {
  __typename: "ResizedImage";
  height: number;
  width: number;
  urls: ArtworkImagesFragment_images_thumbnail_urls;
}

export interface ArtworkImagesFragment_images {
  __typename: "Image";
  id: string;
  thumbnail: ArtworkImagesFragment_images_thumbnail;
}

export interface ArtworkImagesFragment {
  __typename: "Artwork";
  id: string;
  images: ArtworkImagesFragment_images[];
}
