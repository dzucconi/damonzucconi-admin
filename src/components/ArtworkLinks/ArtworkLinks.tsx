import React from "react";
import gql from "graphql-tag";
import { Stack, Input, Button, Plus } from "@auspices/eos";
import { ArtworkLinksFragment } from "../../generated/types/ArtworkLinksFragment";

export const ARTWORK_LINKS_FRAGMENT = gql`
  fragment ArtworkLinksFragment on Artwork {
    id
    links {
      id
      url
      title
      kind
      state
    }
  }
`;

type ArtworkLinksProps = {
  artwork: ArtworkLinksFragment;
};

export const ArtworkLinks: React.FC<ArtworkLinksProps> = ({
  artwork,
  ...rest
}) => {
  return (
    <Stack {...rest}>
      <Button>
        <Plus size={4} strokeWidth="1px" mr={3} />
        link
      </Button>

      {artwork.links.map((link) => {
        return (
          <Stack key={link.id} direction="horizontal">
            <Input defaultValue={link.kind} placeholder="kind" />
            <Input defaultValue={link.state} placeholder="state" />
            <Input flex={2} defaultValue={link.url} placeholder="https://" />
            <Input
              flex={1}
              defaultValue={link.title || ""}
              placeholder="title"
            />
          </Stack>
        );
      })}
    </Stack>
  );
};
