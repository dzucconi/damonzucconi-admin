import React, { useState } from "react";
import gql from "graphql-tag";
import { Stack, Button, Plus, Modal, Grid } from "@auspices/eos";
import { ArtworkLinksFragment } from "../../generated/graphql";
import { ArtworkLinksLinkForm } from "./ArtworkLinksLinkForm";
import { ArtworkLinksLink } from "./ArtworkLinksLink";

gql`
  fragment ArtworkLinksFragment on Artwork {
    id
    links {
      id
      ...ArtworkLinksLink_link
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
          <ArtworkLinksLinkForm artworkId={artwork.id} onDone={handleClose} />
        </Modal>
      )}

      <Stack {...rest}>
        <Button onClick={handleClick}>
          <Plus size={4} strokeWidth="1px" mr={3} />
          Link
        </Button>

        {artwork.links.length > 0 && (
          <Grid my={6}>
            {artwork.links.map((link) => {
              return (
                <ArtworkLinksLink
                  key={link.id}
                  artworkId={artwork.id}
                  link={link}
                />
              );
            })}
          </Grid>
        )}
      </Stack>
    </>
  );
};
