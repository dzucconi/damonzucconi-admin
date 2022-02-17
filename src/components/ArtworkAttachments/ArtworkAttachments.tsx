import React from "react";
import gql from "graphql-tag";
import { Stack, Plus, Grid } from "@auspices/eos";
import {
  ArtworkAttachmentsFragment,
  useAddArtworkAttachmentMutation,
} from "../../generated/graphql";
import { FileUploadButton } from "../FileUploadButton";
import { ArtworkAttachmentsAttachment } from "./ArtworkAttachmentsAttachment";

gql`
  fragment ArtworkAttachmentsFragment on Artwork {
    id
    slug
    attachments {
      id
      ...ArtworkAttachmentsAttachment_attachment
    }
  }
`;

gql`
  mutation AddArtworkAttachmentMutation(
    $id: ID!
    $attachment: AttachmentAttributes!
  ) {
    add_artwork_entity(
      input: { id: $id, entity: { attachment: $attachment } }
    ) {
      artwork {
        id
        ...ArtworkAttachmentsFragment
      }
    }
  }
`;

type ArtworkAttachmentsProps = {
  artwork: ArtworkAttachmentsFragment;
};

export const ArtworkAttachments: React.FC<ArtworkAttachmentsProps> = ({
  artwork,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, addArtworkAttachment] = useAddArtworkAttachmentMutation();

  return (
    <Stack {...rest}>
      <FileUploadButton
        slug={artwork.slug}
        onUpload={(url) => {
          return addArtworkAttachment({ id: artwork.id, attachment: { url } });
        }}
      >
        <Plus size={4} strokeWidth="1px" mr={3} />
        Attachment
      </FileUploadButton>

      <Grid my={6}>
        {artwork.attachments.map((attachment) => {
          return (
            <ArtworkAttachmentsAttachment
              key={attachment.id}
              artworkId={artwork.id}
              attachment={attachment}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};
