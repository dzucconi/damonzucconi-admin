import React, { useState } from "react";
import gql from "graphql-tag";
import { Stack, Button, Plus, Modal, Grid } from "@auspices/eos";
import { ArtworkEmbedsFragment } from "../../generated/graphql";
import { ArtworkEmbedsEmbedForm } from "./ArtworkEmbedsEmbedForm";
import { ArtworkEmbedsEmbed } from "./ArtworkEmbedsEmbed";

gql`
  fragment ArtworkEmbedsFragment on Artwork {
    id
    embeds {
      id
      ...ArtworkEmbedsEmbed_embed
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
          <ArtworkEmbedsEmbedForm artworkId={artwork.id} onDone={handleClose} />
        </Modal>
      )}

      <Stack {...rest}>
        <Button onClick={handleClick}>
          <Plus size={4} strokeWidth="1px" mr={3} />
          Embed
        </Button>

        {artwork.embeds.length > 0 && (
          <Grid my={6}>
            {artwork.embeds.map((embed) => {
              return (
                <ArtworkEmbedsEmbed
                  key={embed.id}
                  artworkId={artwork.id}
                  embed={embed}
                />
              );
            })}
          </Grid>
        )}
      </Stack>
    </>
  );
};
