import React from "react";
import gql from "graphql-tag";
import { Button, Stack, Plus, Input } from "@auspices/eos";
import { ArtworkEditionsFragment } from "../../generated/graphql";

export const ARTWORK_EDITIONS_FRAGMENT = gql`
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

export type ArtworkEditionsProps = {
  artwork: ArtworkEditionsFragment;
};

export const ArtworkEditions: React.FC<ArtworkEditionsProps> = ({
  artwork,
  ...rest
}) => {
  return (
    <Stack {...rest}>
      <Button>
        <Plus size={4} strokeWidth="1px" mr={3} />
        Edition
      </Button>

      {artwork.editions.map((edition) => {
        return (
          <Stack key={edition.id} direction="horizontal">
            <Input value={edition.state} />

            <Input
              defaultValue={edition.collector || ""}
              placeholder="collector"
              flex={1}
            />

            <Input
              defaultValue={edition.location || ""}
              placeholder="location"
              flex={1}
            />

            <Input
              defaultValue={edition.notes || ""}
              placeholder="notes"
              flex={1}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};
