import React, { useState } from "react";
import gql from "graphql-tag";
import { Button, Stack, Plus, Grid, Tooltip, Modal } from "@auspices/eos";
import { ArtworkEditionsFragment } from "../../generated/graphql";
import { ArtworkEditionsEdition } from "./ArtworkEditionsEdition";
import { ArtworkEditionsEditionForm } from "./ArtworkEditionsEditionForm";

export type ArtworkEditionsProps = {
  artwork: ArtworkEditionsFragment;
};

export const ArtworkEditions: React.FC<ArtworkEditionsProps> = ({
  artwork,
  ...rest
}) => {
  const [mode, setMode] = useState<"Pending" | "Open">("Pending");

  const handleClick = () => {
    setMode("Open");
  };

  const handleClose = () => {
    setMode("Pending");
  };

  return (
    <>
      {mode === "Open" && (
        <Modal zIndex={10} overlay onClose={handleClose}>
          <ArtworkEditionsEditionForm
            artworkId={artwork.id}
            onDone={handleClose}
          />
        </Modal>
      )}

      <Stack {...rest}>
        <Tooltip
          label="Click to add an edition"
          placement="bottom"
          distance={10}
        >
          <Button onClick={handleClick}>
            <Plus size={4} strokeWidth="1px" mr={3} />
            Edition
          </Button>
        </Tooltip>

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
    </>
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
