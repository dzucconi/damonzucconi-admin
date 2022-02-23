import React from "react";
import gql from "graphql-tag";
import { Button, Stack, Plus, Grid } from "@auspices/eos";
import { ArtworkEditionsFragment } from "../../generated/graphql";
import { ArtworkEditionsEdition } from "./ArtworkEditionsEdition";

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

      {artwork.editions.length > 0 && (
        <Grid my={6}>
          {artwork.editions.map((edition) => {
            return (
              <ArtworkEditionsEdition
                key={edition.id}
                artworkId={artwork.id}
                edition={edition}
              />
            );
          })}
        </Grid>
      )}
    </Stack>
  );
};

gql`
  fragment ArtworkEditionsFragment on Artwork {
    id
    editions {
      ...ArtworkEditionsEdition_edition
      id
    }
  }
`;
