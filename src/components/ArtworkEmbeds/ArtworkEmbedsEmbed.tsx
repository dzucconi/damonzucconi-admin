import { Button, Modal, Truncate } from "@auspices/eos";
import React, { useState } from "react";
import { gql } from "urql";
import { ArtworkEmbedsEmbed_EmbedFragment } from "../../generated/graphql";
import { ArtworkEmbedsEmbedForm } from "./ArtworkEmbedsEmbedForm";

gql`
  fragment ArtworkEmbedsEmbed_embed on Embed {
    ...ArtworkEmbedsEmbedForm_embed
    html
  }
`;

type ArtworkEmbedsEmbedProps = {
  artworkId: string;
  embed: ArtworkEmbedsEmbed_EmbedFragment;
};

export const ArtworkEmbedsEmbed: React.FC<ArtworkEmbedsEmbedProps> = ({
  artworkId,
  embed,
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
          <ArtworkEmbedsEmbedForm
            artworkId={artworkId}
            onDone={handleClose}
            embed={embed}
          />
        </Modal>
      )}

      <Button flex={1} onClick={handleClick} justifyContent="flex-start">
        <Truncate>{embed.html}</Truncate>
      </Button>
    </>
  );
};
