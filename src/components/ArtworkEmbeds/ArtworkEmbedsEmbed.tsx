import { Box, File, Modal } from "@auspices/eos";
import React, { useState } from "react";
import { gql } from "urql";
import { ArtworkEmbedsEmbed_EmbedFragment } from "../../generated/graphql";
import { FadeOut } from "../FadeOut";
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

      <File onClick={handleClick}>
        <Box
          fontFamily="mono"
          fontSize={0}
          color="secondary"
          border="1px solid"
          borderColor="tertiary"
          width="100%"
          height="100%"
          style={{ wordBreak: "break-all" }}
          py={3}
          px={4}
        >
          {embed.html!.length > 500 ? (
            <FadeOut>{embed.html}</FadeOut>
          ) : (
            <>{embed.html}</>
          )}
        </Box>
      </File>
    </>
  );
};
