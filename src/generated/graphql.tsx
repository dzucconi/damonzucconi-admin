import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Autogenerated input type of AddArtworkEntityMutation */
export type AddArtworkEntityMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  entity: ArtworkEntityAttributes;
  id: Scalars['ID'];
};

/** Autogenerated return type of AddArtworkEntityMutation */
export type AddArtworkEntityMutationPayload = {
  __typename?: 'AddArtworkEntityMutationPayload';
  artwork: Artwork;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of AddArtworkMutation */
export type AddArtworkMutationInput = {
  attributes: ArtworkAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of AddArtworkMutation */
export type AddArtworkMutationPayload = {
  __typename?: 'AddArtworkMutationPayload';
  artwork: Artwork;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** An artwork */
export type Artwork = {
  __typename?: 'Artwork';
  attachments: Array<Attachment>;
  collector_byline?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  depth?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  dimensions?: Maybe<Dimensions>;
  duration?: Maybe<Scalars['String']>;
  editions: Array<Edition>;
  embeds: Array<Embed>;
  gloss?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  images: Array<Image>;
  intent: ArtworkIntent;
  links: Array<Link>;
  material?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  slug: Scalars['String'];
  src?: Maybe<Scalars['String']>;
  state: State;
  title: Scalars['String'];
  unit?: Maybe<Scalars['String']>;
  updated_at: Scalars['String'];
  width?: Maybe<Scalars['Float']>;
  year: Scalars['Int'];
};


/** An artwork */
export type ArtworkCreated_AtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


/** An artwork */
export type ArtworkDescriptionArgs = {
  format?: InputMaybe<Format>;
};


/** An artwork */
export type ArtworkImagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Array<State>>;
};


/** An artwork */
export type ArtworkLinksArgs = {
  kind?: InputMaybe<Array<Kind>>;
  state?: InputMaybe<Array<State>>;
};


/** An artwork */
export type ArtworkUpdated_AtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};

export type ArtworkAttributes = {
  depth?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['String']>;
  gloss?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  material?: InputMaybe<Scalars['String']>;
  state: State;
  title: Scalars['String'];
  unit?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
  year: Scalars['Int'];
};

export type ArtworkEntityAttributes = {
  attachment?: InputMaybe<AttachmentAttributes>;
  edition?: InputMaybe<EditionAttributes>;
  embed?: InputMaybe<EmbedAttributes>;
  image?: InputMaybe<ImageAttributes>;
  link?: InputMaybe<LinkAttributes>;
};

export enum ArtworkIntent {
  Canonical = 'CANONICAL',
  Default = 'DEFAULT',
  Embed = 'EMBED'
}

/** An attachment */
export type Attachment = {
  __typename?: 'Attachment';
  file_extension: Scalars['String'];
  file_name: Scalars['String'];
  file_type: Scalars['String'];
  id: Scalars['String'];
  state: State;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type AttachmentAttributes = {
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

/** Curriculum Vitae */
export type Cv = {
  __typename?: 'Cv';
  categories: Array<CvCategory>;
};

/** A single category in the CV */
export type CvCategory = {
  __typename?: 'CvCategory';
  name: Scalars['String'];
  years: Array<CvYear>;
};

/** A single row in the CV */
export type CvEntry = {
  __typename?: 'CvEntry';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  to_html: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
};

/** A single year in the CV */
export type CvYear = {
  __typename?: 'CvYear';
  entries: Array<CvEntry>;
  year: Scalars['Int'];
};

/** Dimensions */
export type Dimension = {
  __typename?: 'Dimension';
  depth?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  to_s?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

/** Dimensions in metric and imperial */
export type Dimensions = {
  __typename?: 'Dimensions';
  centimeters: Dimension;
  inches: Dimension;
};

/** An edition */
export type Edition = {
  __typename?: 'Edition';
  collector?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  is_attributable: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  state: State;
};

export type EditionAttributes = {
  attributable?: InputMaybe<Scalars['Boolean']>;
  collector?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  productionCost?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EditionState>;
};

export enum EditionState {
  Available = 'AVAILABLE',
  NotForSale = 'NOT_FOR_SALE',
  Sold = 'SOLD'
}

/** An embed */
export type Embed = {
  __typename?: 'Embed';
  html?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type EmbedAttributes = {
  html: Scalars['String'];
};

export enum EntityType {
  Attachment = 'ATTACHMENT',
  Edition = 'EDITION',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK'
}

/** An exhibition */
export type Exhibition = {
  __typename?: 'Exhibition';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['String']>;
  external_url?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  kind: Scalars['String'];
  slug: Scalars['String'];
  start_date?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['String'];
  venue?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};


/** An exhibition */
export type ExhibitionCreated_AtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


/** An exhibition */
export type ExhibitionDescriptionArgs = {
  format?: InputMaybe<Format>;
};


/** An exhibition */
export type ExhibitionEnd_DateArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


/** An exhibition */
export type ExhibitionImagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Array<State>>;
};


/** An exhibition */
export type ExhibitionStart_DateArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


/** An exhibition */
export type ExhibitionUpdated_AtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};

export enum Format {
  Html = 'HTML',
  Plain = 'PLAIN'
}

/** An image */
export type Image = {
  __typename?: 'Image';
  description?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  largest_side_display_size?: Maybe<Scalars['Int']>;
  position: Scalars['Int'];
  resized: ResizedImage;
  scale?: Maybe<Scalars['Float']>;
  state: State;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};


/** An image */
export type ImageResizedArgs = {
  blur?: InputMaybe<Scalars['Float']>;
  height?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  scale?: InputMaybe<Scalars['Float']>;
  sharpen?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type ImageAttributes = {
  description?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  largestSideDisplaySize?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export enum Kind {
  Canonical = 'CANONICAL',
  Default = 'DEFAULT'
}

/** A link */
export type Link = {
  __typename?: 'Link';
  id: Scalars['String'];
  kind: Kind;
  state: State;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type LinkAttributes = {
  kind?: InputMaybe<Kind>;
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add_artwork?: Maybe<AddArtworkMutationPayload>;
  add_artwork_entity?: Maybe<AddArtworkEntityMutationPayload>;
  remove_artwork_entity?: Maybe<RemoveArtworkEntityMutationPayload>;
  update_artwork?: Maybe<UpdateArtworkMutationPayload>;
  update_artwork_entity?: Maybe<UpdateArtworkEntityMutationPayload>;
};


export type MutationAdd_ArtworkArgs = {
  input: AddArtworkMutationInput;
};


export type MutationAdd_Artwork_EntityArgs = {
  input: AddArtworkEntityMutationInput;
};


export type MutationRemove_Artwork_EntityArgs = {
  input: RemoveArtworkEntityMutationInput;
};


export type MutationUpdate_ArtworkArgs = {
  input: UpdateArtworkMutationInput;
};


export type MutationUpdate_Artwork_EntityArgs = {
  input: UpdateArtworkEntityMutationInput;
};

export type PresignedUrlAttributes = {
  fileKey: Scalars['String'];
  fileType: Scalars['String'];
};

/** The query root for this schema */
export type Query = {
  __typename?: 'Query';
  /** An artwork */
  artwork: Artwork;
  artworks: Array<Artwork>;
  cv: Cv;
  /** An exhibition */
  exhibition: Exhibition;
  exhibitions: Array<Exhibition>;
  presigned_upload_urls: Array<Scalars['String']>;
  /** An representation */
  representation: Representation;
  representations: Array<Representation>;
  /** System status */
  status: Status;
};


/** The query root for this schema */
export type QueryArtworkArgs = {
  id: Scalars['ID'];
};


/** The query root for this schema */
export type QueryArtworksArgs = {
  state?: InputMaybe<Array<InputMaybe<State>>>;
};


/** The query root for this schema */
export type QueryExhibitionArgs = {
  id: Scalars['ID'];
};


/** The query root for this schema */
export type QueryExhibitionsArgs = {
  state?: InputMaybe<Array<InputMaybe<State>>>;
};


/** The query root for this schema */
export type QueryPresigned_Upload_UrlsArgs = {
  uploads: Array<PresignedUrlAttributes>;
};


/** The query root for this schema */
export type QueryRepresentationArgs = {
  id: Scalars['ID'];
};

/** Autogenerated input type of RemoveArtworkEntityMutation */
export type RemoveArtworkEntityMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  entity: RemoveEntityAttributes;
  id: Scalars['ID'];
};

/** Autogenerated return type of RemoveArtworkEntityMutation */
export type RemoveArtworkEntityMutationPayload = {
  __typename?: 'RemoveArtworkEntityMutationPayload';
  artwork: Artwork;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveEntityAttributes = {
  id: Scalars['ID'];
  type: EntityType;
};

/** A representation of some other type */
export type Representation = {
  __typename?: 'Representation';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  mode: Scalars['String'];
  position: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/** A resized image */
export type ResizedImage = {
  __typename?: 'ResizedImage';
  factor: Scalars['Float'];
  height: Scalars['Int'];
  ratio: Scalars['Float'];
  urls: RetinaImage;
  width: Scalars['Int'];
};

/** A retina image */
export type RetinaImage = {
  __typename?: 'RetinaImage';
  _1x: Scalars['String'];
  _2x: Scalars['String'];
  _3x: Scalars['String'];
};

export enum State {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Selected = 'SELECTED'
}

/** System status */
export type Status = {
  __typename?: 'Status';
  authenticated: Scalars['Boolean'];
  up: Scalars['Boolean'];
};

export type UpdateArtworkAttributes = {
  depth?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['String']>;
  gloss?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  material?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type UpdateArtworkEntityAttributes = {
  attachment?: InputMaybe<UpdateAttachmentAttributes>;
  edition?: InputMaybe<UpdateEditionAttributes>;
  embed?: InputMaybe<UpdateEmbedAttributes>;
  id: Scalars['ID'];
  image?: InputMaybe<UpdateImageAttributes>;
  link?: InputMaybe<UpdateLinkAttributes>;
};

/** Autogenerated input type of UpdateArtworkEntityMutation */
export type UpdateArtworkEntityMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  entity: UpdateArtworkEntityAttributes;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateArtworkEntityMutation */
export type UpdateArtworkEntityMutationPayload = {
  __typename?: 'UpdateArtworkEntityMutationPayload';
  artwork: Artwork;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateArtworkMutation */
export type UpdateArtworkMutationInput = {
  attributes: UpdateArtworkAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateArtworkMutation */
export type UpdateArtworkMutationPayload = {
  __typename?: 'UpdateArtworkMutationPayload';
  artwork: Artwork;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateAttachmentAttributes = {
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateEditionAttributes = {
  attributable?: InputMaybe<Scalars['Boolean']>;
  collector?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  productionCost?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EditionState>;
};

export type UpdateEmbedAttributes = {
  html: Scalars['String'];
};

export type UpdateImageAttributes = {
  description?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  largestSideDisplaySize?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UpdateLinkAttributes = {
  kind?: InputMaybe<Kind>;
  state?: InputMaybe<State>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ArtworkAttachmentsFragment = { __typename?: 'Artwork', id: string, slug: string, attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }> };

export type AddArtworkAttachmentMutationVariables = Exact<{
  id: Scalars['ID'];
  attachment: AttachmentAttributes;
}>;


export type AddArtworkAttachmentMutation = { __typename?: 'Mutation', add_artwork_entity?: { __typename?: 'AddArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, slug: string, attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }> } } | null };

export type UpdateAttachmentMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  attachmentId: Scalars['ID'];
  attributes: UpdateAttachmentAttributes;
}>;


export type UpdateAttachmentMutation = { __typename?: 'Mutation', update_artwork_entity?: { __typename?: 'UpdateArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }> } } | null };

export type RemoveAttachmentMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  attachmentId: Scalars['ID'];
}>;


export type RemoveAttachmentMutation = { __typename?: 'Mutation', remove_artwork_entity?: { __typename?: 'RemoveArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, slug: string, attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }> } } | null };

export type ArtworkAttachmentsAttachment_AttachmentFragment = { __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string };

export type ArtworkAttributesFragment = { __typename?: 'Artwork', id: string, slug: string, state: State, title: string, year: number, material?: string | null, duration?: string | null, gloss?: string | null, description?: string | null, dimensions?: { __typename?: 'Dimensions', inches: { __typename?: 'Dimension', width?: number | null, height?: number | null, depth?: number | null, unit?: string | null } } | null };

export type ArtworkEditionsFragment = { __typename?: 'Artwork', editions: Array<{ __typename?: 'Edition', id: string, state: State, collector?: string | null, location?: string | null, notes?: string | null, is_attributable: boolean }> };

export type ArtworkEmbedsFragment = { __typename?: 'Artwork', id: string, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }> };

export type ArtworkEmbedsEmbed_EmbedFragment = { __typename?: 'Embed', html?: string | null, id: string };

export type AddEmbedMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  attributes: EmbedAttributes;
}>;


export type AddEmbedMutation = { __typename?: 'Mutation', add_artwork_entity?: { __typename?: 'AddArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }> } } | null };

export type UpdateEmbedMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  embedId: Scalars['ID'];
  attributes: UpdateEmbedAttributes;
}>;


export type UpdateEmbedMutation = { __typename?: 'Mutation', update_artwork_entity?: { __typename?: 'UpdateArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }> } } | null };

export type RemoveEmbedMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  embedId: Scalars['ID'];
}>;


export type RemoveEmbedMutation = { __typename?: 'Mutation', remove_artwork_entity?: { __typename?: 'RemoveArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }> } } | null };

export type ArtworkEmbedsEmbedForm_EmbedFragment = { __typename?: 'Embed', id: string, html?: string | null };

export type ArtworkImagesFragment = { __typename?: 'Artwork', id: string, slug: string, images: Array<{ __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }> };

export type AddArtworkImageMutationVariables = Exact<{
  id: Scalars['ID'];
  image: ImageAttributes;
}>;


export type AddArtworkImageMutation = { __typename?: 'Mutation', add_artwork_entity?: { __typename?: 'AddArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, slug: string, images: Array<{ __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }> } } | null };

export type UpdateImageMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  imageId: Scalars['ID'];
  attributes: UpdateImageAttributes;
}>;


export type UpdateImageMutation = { __typename?: 'Mutation', update_artwork_entity?: { __typename?: 'UpdateArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', images: Array<{ __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }> } } | null };

export type ArtworkImagesImage_ImageFragment = { __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } };

export type ArtworkLinksFragment = { __typename?: 'Artwork', id: string, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }> };

export type ArtworkLinksLink_LinkFragment = { __typename?: 'Link', title?: string | null, url: string, state: State, kind: Kind, id: string };

export type AddLinkMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  attributes: LinkAttributes;
}>;


export type AddLinkMutation = { __typename?: 'Mutation', add_artwork_entity?: { __typename?: 'AddArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }> } } | null };

export type UpdateLinkMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  linkId: Scalars['ID'];
  attributes: UpdateLinkAttributes;
}>;


export type UpdateLinkMutation = { __typename?: 'Mutation', update_artwork_entity?: { __typename?: 'UpdateArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }> } } | null };

export type RemoveLinkMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  linkId: Scalars['ID'];
}>;


export type RemoveLinkMutation = { __typename?: 'Mutation', remove_artwork_entity?: { __typename?: 'RemoveArtworkEntityMutationPayload', artwork: { __typename?: 'Artwork', id: string, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }> } } | null };

export type ArtworkLinksLinkForm_LinkFragment = { __typename?: 'Link', id: string, state: State, kind: Kind, url: string, title?: string | null };

export type FilesUploaderQueryVariables = Exact<{
  uploads: Array<PresignedUrlAttributes> | PresignedUrlAttributes;
}>;


export type FilesUploaderQuery = { __typename?: 'Query', presigned_upload_urls: Array<string> };

export type ArtworkIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtworkIndexPageQuery = { __typename?: 'Query', artworks: Array<{ __typename?: 'Artwork', id: string, state: State, slug: string, title: string }> };

export type AddArtworkMutationVariables = Exact<{
  attributes: ArtworkAttributes;
}>;


export type AddArtworkMutation = { __typename?: 'Mutation', add_artwork?: { __typename?: 'AddArtworkMutationPayload', artwork: { __typename?: 'Artwork', id: string, slug: string } } | null };

export type ArtworkShowPageArtworkFragment = { __typename?: 'Artwork', id: string, slug: string, state: State, title: string, year: number, material?: string | null, duration?: string | null, gloss?: string | null, description?: string | null, primaryImage: Array<{ __typename?: 'Image', id: string, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }>, dimensions?: { __typename?: 'Dimensions', inches: { __typename?: 'Dimension', width?: number | null, height?: number | null, depth?: number | null, unit?: string | null } } | null, images: Array<{ __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }>, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }>, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }>, editions: Array<{ __typename?: 'Edition', id: string, state: State, collector?: string | null, location?: string | null, notes?: string | null, is_attributable: boolean }> };

export type ArtworkShowPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArtworkShowPageQuery = { __typename?: 'Query', artwork: { __typename?: 'Artwork', id: string, slug: string, state: State, title: string, year: number, material?: string | null, duration?: string | null, gloss?: string | null, description?: string | null, primaryImage: Array<{ __typename?: 'Image', id: string, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }>, dimensions?: { __typename?: 'Dimensions', inches: { __typename?: 'Dimension', width?: number | null, height?: number | null, depth?: number | null, unit?: string | null } } | null, images: Array<{ __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }>, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }>, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }>, editions: Array<{ __typename?: 'Edition', id: string, state: State, collector?: string | null, location?: string | null, notes?: string | null, is_attributable: boolean }> } };

export type ArtworkShowPageUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  attributes: UpdateArtworkAttributes;
}>;


export type ArtworkShowPageUpdateMutation = { __typename?: 'Mutation', update_artwork?: { __typename?: 'UpdateArtworkMutationPayload', artwork: { __typename?: 'Artwork', id: string, slug: string, state: State, title: string, year: number, material?: string | null, duration?: string | null, gloss?: string | null, description?: string | null, primaryImage: Array<{ __typename?: 'Image', id: string, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }>, dimensions?: { __typename?: 'Dimensions', inches: { __typename?: 'Dimension', width?: number | null, height?: number | null, depth?: number | null, unit?: string | null } } | null, images: Array<{ __typename?: 'Image', id: string, width?: number | null, height?: number | null, title?: string | null, description?: string | null, thumbnail: { __typename?: 'ResizedImage', height: number, width: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } }>, links: Array<{ __typename?: 'Link', id: string, title?: string | null, url: string, state: State, kind: Kind }>, embeds: Array<{ __typename?: 'Embed', id: string, html?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, file_name: string, file_type: string, state: State, title?: string | null, url: string }>, editions: Array<{ __typename?: 'Edition', id: string, state: State, collector?: string | null, location?: string | null, notes?: string | null, is_attributable: boolean }> } } | null };

export const ArtworkAttributesFragmentDoc = gql`
    fragment ArtworkAttributesFragment on Artwork {
  id
  slug
  state
  title
  year
  material
  dimensions {
    inches {
      width
      height
      depth
      unit
    }
  }
  duration
  gloss
  description
}
    `;
export const ArtworkImagesImage_ImageFragmentDoc = gql`
    fragment ArtworkImagesImage_image on Image {
  id
  width
  height
  title
  description
  thumbnail: resized(width: 250, height: 250) {
    height
    width
    urls {
      _1x
      _2x
    }
  }
}
    `;
export const ArtworkImagesFragmentDoc = gql`
    fragment ArtworkImagesFragment on Artwork {
  id
  slug
  images {
    id
    ...ArtworkImagesImage_image
  }
}
    ${ArtworkImagesImage_ImageFragmentDoc}`;
export const ArtworkLinksLinkForm_LinkFragmentDoc = gql`
    fragment ArtworkLinksLinkForm_link on Link {
  id
  state
  kind
  url
  title
}
    `;
export const ArtworkLinksLink_LinkFragmentDoc = gql`
    fragment ArtworkLinksLink_link on Link {
  title
  url
  state
  kind
  ...ArtworkLinksLinkForm_link
}
    ${ArtworkLinksLinkForm_LinkFragmentDoc}`;
export const ArtworkLinksFragmentDoc = gql`
    fragment ArtworkLinksFragment on Artwork {
  id
  links {
    id
    ...ArtworkLinksLink_link
  }
}
    ${ArtworkLinksLink_LinkFragmentDoc}`;
export const ArtworkEmbedsEmbedForm_EmbedFragmentDoc = gql`
    fragment ArtworkEmbedsEmbedForm_embed on Embed {
  id
  html
}
    `;
export const ArtworkEmbedsEmbed_EmbedFragmentDoc = gql`
    fragment ArtworkEmbedsEmbed_embed on Embed {
  ...ArtworkEmbedsEmbedForm_embed
  html
}
    ${ArtworkEmbedsEmbedForm_EmbedFragmentDoc}`;
export const ArtworkEmbedsFragmentDoc = gql`
    fragment ArtworkEmbedsFragment on Artwork {
  id
  embeds {
    id
    ...ArtworkEmbedsEmbed_embed
  }
}
    ${ArtworkEmbedsEmbed_EmbedFragmentDoc}`;
export const ArtworkAttachmentsAttachment_AttachmentFragmentDoc = gql`
    fragment ArtworkAttachmentsAttachment_attachment on Attachment {
  id
  file_name
  file_type
  state
  title
  url
}
    `;
export const ArtworkAttachmentsFragmentDoc = gql`
    fragment ArtworkAttachmentsFragment on Artwork {
  id
  slug
  attachments {
    id
    ...ArtworkAttachmentsAttachment_attachment
  }
}
    ${ArtworkAttachmentsAttachment_AttachmentFragmentDoc}`;
export const ArtworkEditionsFragmentDoc = gql`
    fragment ArtworkEditionsFragment on Artwork {
  editions {
    id
    state
    collector
    location
    notes
    is_attributable
  }
}
    `;
export const ArtworkShowPageArtworkFragmentDoc = gql`
    fragment ArtworkShowPageArtworkFragment on Artwork {
  id
  ...ArtworkAttributesFragment
  primaryImage: images(limit: 1) {
    id
    thumbnail: resized(width: 400, height: 400) {
      height
      width
      urls {
        _1x
        _2x
      }
    }
  }
  ...ArtworkImagesFragment
  ...ArtworkLinksFragment
  ...ArtworkEmbedsFragment
  ...ArtworkAttachmentsFragment
  ...ArtworkEditionsFragment
}
    ${ArtworkAttributesFragmentDoc}
${ArtworkImagesFragmentDoc}
${ArtworkLinksFragmentDoc}
${ArtworkEmbedsFragmentDoc}
${ArtworkAttachmentsFragmentDoc}
${ArtworkEditionsFragmentDoc}`;
export const AddArtworkAttachmentMutationDocument = gql`
    mutation AddArtworkAttachmentMutation($id: ID!, $attachment: AttachmentAttributes!) {
  add_artwork_entity(input: {id: $id, entity: {attachment: $attachment}}) {
    artwork {
      id
      ...ArtworkAttachmentsFragment
    }
  }
}
    ${ArtworkAttachmentsFragmentDoc}`;

export function useAddArtworkAttachmentMutation() {
  return Urql.useMutation<AddArtworkAttachmentMutation, AddArtworkAttachmentMutationVariables>(AddArtworkAttachmentMutationDocument);
};
export const UpdateAttachmentDocument = gql`
    mutation UpdateAttachment($artworkId: ID!, $attachmentId: ID!, $attributes: UpdateAttachmentAttributes!) {
  update_artwork_entity(
    input: {id: $artworkId, entity: {id: $attachmentId, attachment: $attributes}}
  ) {
    artwork {
      attachments {
        ...ArtworkAttachmentsAttachment_attachment
      }
    }
  }
}
    ${ArtworkAttachmentsAttachment_AttachmentFragmentDoc}`;

export function useUpdateAttachmentMutation() {
  return Urql.useMutation<UpdateAttachmentMutation, UpdateAttachmentMutationVariables>(UpdateAttachmentDocument);
};
export const RemoveAttachmentDocument = gql`
    mutation RemoveAttachment($artworkId: ID!, $attachmentId: ID!) {
  remove_artwork_entity(
    input: {id: $artworkId, entity: {id: $attachmentId, type: ATTACHMENT}}
  ) {
    artwork {
      ...ArtworkAttachmentsFragment
    }
  }
}
    ${ArtworkAttachmentsFragmentDoc}`;

export function useRemoveAttachmentMutation() {
  return Urql.useMutation<RemoveAttachmentMutation, RemoveAttachmentMutationVariables>(RemoveAttachmentDocument);
};
export const AddEmbedDocument = gql`
    mutation AddEmbed($artworkId: ID!, $attributes: EmbedAttributes!) {
  add_artwork_entity(input: {id: $artworkId, entity: {embed: $attributes}}) {
    artwork {
      ...ArtworkEmbedsFragment
    }
  }
}
    ${ArtworkEmbedsFragmentDoc}`;

export function useAddEmbedMutation() {
  return Urql.useMutation<AddEmbedMutation, AddEmbedMutationVariables>(AddEmbedDocument);
};
export const UpdateEmbedDocument = gql`
    mutation UpdateEmbed($artworkId: ID!, $embedId: ID!, $attributes: UpdateEmbedAttributes!) {
  update_artwork_entity(
    input: {id: $artworkId, entity: {id: $embedId, embed: $attributes}}
  ) {
    artwork {
      ...ArtworkEmbedsFragment
    }
  }
}
    ${ArtworkEmbedsFragmentDoc}`;

export function useUpdateEmbedMutation() {
  return Urql.useMutation<UpdateEmbedMutation, UpdateEmbedMutationVariables>(UpdateEmbedDocument);
};
export const RemoveEmbedDocument = gql`
    mutation RemoveEmbed($artworkId: ID!, $embedId: ID!) {
  remove_artwork_entity(
    input: {id: $artworkId, entity: {id: $embedId, type: EMBED}}
  ) {
    artwork {
      ...ArtworkEmbedsFragment
    }
  }
}
    ${ArtworkEmbedsFragmentDoc}`;

export function useRemoveEmbedMutation() {
  return Urql.useMutation<RemoveEmbedMutation, RemoveEmbedMutationVariables>(RemoveEmbedDocument);
};
export const AddArtworkImageMutationDocument = gql`
    mutation AddArtworkImageMutation($id: ID!, $image: ImageAttributes!) {
  add_artwork_entity(input: {id: $id, entity: {image: $image}}) {
    artwork {
      id
      ...ArtworkImagesFragment
    }
  }
}
    ${ArtworkImagesFragmentDoc}`;

export function useAddArtworkImageMutation() {
  return Urql.useMutation<AddArtworkImageMutation, AddArtworkImageMutationVariables>(AddArtworkImageMutationDocument);
};
export const UpdateImageDocument = gql`
    mutation UpdateImage($artworkId: ID!, $imageId: ID!, $attributes: UpdateImageAttributes!) {
  update_artwork_entity(
    input: {id: $artworkId, entity: {id: $imageId, image: $attributes}}
  ) {
    artwork {
      images {
        ...ArtworkImagesImage_image
      }
    }
  }
}
    ${ArtworkImagesImage_ImageFragmentDoc}`;

export function useUpdateImageMutation() {
  return Urql.useMutation<UpdateImageMutation, UpdateImageMutationVariables>(UpdateImageDocument);
};
export const AddLinkDocument = gql`
    mutation AddLink($artworkId: ID!, $attributes: LinkAttributes!) {
  add_artwork_entity(input: {id: $artworkId, entity: {link: $attributes}}) {
    artwork {
      ...ArtworkLinksFragment
    }
  }
}
    ${ArtworkLinksFragmentDoc}`;

export function useAddLinkMutation() {
  return Urql.useMutation<AddLinkMutation, AddLinkMutationVariables>(AddLinkDocument);
};
export const UpdateLinkDocument = gql`
    mutation UpdateLink($artworkId: ID!, $linkId: ID!, $attributes: UpdateLinkAttributes!) {
  update_artwork_entity(
    input: {id: $artworkId, entity: {id: $linkId, link: $attributes}}
  ) {
    artwork {
      ...ArtworkLinksFragment
    }
  }
}
    ${ArtworkLinksFragmentDoc}`;

export function useUpdateLinkMutation() {
  return Urql.useMutation<UpdateLinkMutation, UpdateLinkMutationVariables>(UpdateLinkDocument);
};
export const RemoveLinkDocument = gql`
    mutation RemoveLink($artworkId: ID!, $linkId: ID!) {
  remove_artwork_entity(
    input: {id: $artworkId, entity: {id: $linkId, type: LINK}}
  ) {
    artwork {
      ...ArtworkLinksFragment
    }
  }
}
    ${ArtworkLinksFragmentDoc}`;

export function useRemoveLinkMutation() {
  return Urql.useMutation<RemoveLinkMutation, RemoveLinkMutationVariables>(RemoveLinkDocument);
};
export const FilesUploaderQueryDocument = gql`
    query FilesUploaderQuery($uploads: [PresignedUrlAttributes!]!) {
  presigned_upload_urls(uploads: $uploads)
}
    `;

export function useFilesUploaderQuery(options: Omit<Urql.UseQueryArgs<FilesUploaderQueryVariables>, 'query'>) {
  return Urql.useQuery<FilesUploaderQuery>({ query: FilesUploaderQueryDocument, ...options });
};
export const ArtworkIndexPageQueryDocument = gql`
    query ArtworkIndexPageQuery {
  artworks {
    id
    state
    slug
    title
  }
}
    `;

export function useArtworkIndexPageQuery(options?: Omit<Urql.UseQueryArgs<ArtworkIndexPageQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtworkIndexPageQuery>({ query: ArtworkIndexPageQueryDocument, ...options });
};
export const AddArtworkMutationDocument = gql`
    mutation AddArtworkMutation($attributes: ArtworkAttributes!) {
  add_artwork(input: {attributes: $attributes}) {
    artwork {
      id
      slug
    }
  }
}
    `;

export function useAddArtworkMutation() {
  return Urql.useMutation<AddArtworkMutation, AddArtworkMutationVariables>(AddArtworkMutationDocument);
};
export const ArtworkShowPageQueryDocument = gql`
    query ArtworkShowPageQuery($id: ID!) {
  artwork(id: $id) {
    ...ArtworkShowPageArtworkFragment
  }
}
    ${ArtworkShowPageArtworkFragmentDoc}`;

export function useArtworkShowPageQuery(options: Omit<Urql.UseQueryArgs<ArtworkShowPageQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtworkShowPageQuery>({ query: ArtworkShowPageQueryDocument, ...options });
};
export const ArtworkShowPageUpdateMutationDocument = gql`
    mutation ArtworkShowPageUpdateMutation($id: ID!, $attributes: UpdateArtworkAttributes!) {
  update_artwork(input: {id: $id, attributes: $attributes}) {
    artwork {
      ...ArtworkShowPageArtworkFragment
    }
  }
}
    ${ArtworkShowPageArtworkFragmentDoc}`;

export function useArtworkShowPageUpdateMutation() {
  return Urql.useMutation<ArtworkShowPageUpdateMutation, ArtworkShowPageUpdateMutationVariables>(ArtworkShowPageUpdateMutationDocument);
};