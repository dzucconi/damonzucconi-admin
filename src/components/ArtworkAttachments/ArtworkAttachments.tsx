import React from "react";
import gql from "graphql-tag";
import { Button, Stack, Plus, Input } from "@auspices/eos";
import { ArtworkAttachmentsFragment } from "../../generated/graphql";

export const ARTWORK_ATTACHMENTS_FRAGMENT = gql`
  fragment ArtworkAttachmentsFragment on Artwork {
    attachments {
      id
      title
      url
      state
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
  return (
    <Stack {...rest}>
      <Button>
        <Plus size={4} strokeWidth="1px" mr={3} />
        attachment
      </Button>

      {artwork.attachments.map((attachment) => {
        return (
          <Stack key={attachment.id} direction="horizontal">
            <Input value={attachment.state} />

            <Input
              defaultValue={attachment.title || ""}
              placeholder="title"
              flex={1}
            />

            <Input value={attachment.url} disabled readOnly flex={1} />
          </Stack>
        );
      })}
    </Stack>
  );
};
