import React from "react";
import gql from "graphql-tag";
import { Stack, Input, Pill, Button, Plus } from "@auspices/eos";
import { ArtworkEmbedsFragment } from "../../generated/types/ArtworkEmbedsFragment";

export const ARTWORK_EMBEDS_FRAGMENT = gql`
  fragment ArtworkEmbedsFragment on Artwork {
    id
    embeds {
      id
      html
    }
  }
`;

type ArtworkEmbedsProps = {
  artwork: ArtworkEmbedsFragment;
};

export const ArtworkEmbeds: React.FC<ArtworkEmbedsProps> = ({
  artwork,
  ...rest
}) => {
  return (
    <Stack {...rest}>
      <Button>
        <Plus size={4} strokeWidth="1px" mr={3} />
        embed
      </Button>

      {artwork.embeds.map((embed) => {
        return (
          <Stack key={embed.id}>
            <Pill>html</Pill>
            <Input
              as="textarea"
              defaultValue={embed.html || ""}
              placeholder="html"
              rows={6}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};
