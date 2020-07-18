/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtworkAttachmentsFragment
// ====================================================

export interface ArtworkAttachmentsFragment_attachments {
  __typename: "Attachment";
  id: string;
  title: string | null;
  url: string;
  state: string;
}

export interface ArtworkAttachmentsFragment {
  __typename: "Artwork";
  attachments: ArtworkAttachmentsFragment_attachments[];
}
