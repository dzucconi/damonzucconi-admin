import {
  Modal,
  Tag,
  File,
  Box,
  Truncate,
  ContextMenu,
  PaneOption,
} from "@auspices/eos";
import React, { useState } from "react";
import { gql } from "urql";
import { ArtworkLinksLink_LinkFragment } from "../../generated/graphql";
import { useHover } from "../../hooks/useHover";
import { ArtworkLinksLinkForm } from "./ArtworkLinksLinkForm";

gql`
  fragment ArtworkLinksLink_link on Link {
    ...ArtworkLinksLinkForm_link
    title
    url
    display: url(pretty: true)
    state
    kind
  }
`;

type ArtworkLinksLinkProps = {
  artworkId: string;
  link: ArtworkLinksLink_LinkFragment;
};

export const ArtworkLinksLink: React.FC<ArtworkLinksLinkProps> = ({
  artworkId,
  link,
}) => {
  const [mode, setMode] = useState<"Pending" | "Open">("Pending");

  const handleClick = () => {
    setMode("Open");
  };

  const handleClose = () => {
    setMode("Pending");
  };

  const hover = useHover();

  return (
    <>
      {mode === "Open" && (
        <Modal zIndex={10} overlay onClose={handleClose}>
          <ArtworkLinksLinkForm
            artworkId={artworkId}
            onDone={handleClose}
            link={link}
          />
        </Modal>
      )}

      <Box
        position="relative"
        width="100%"
        onMouseEnter={hover.handleMouseEnter}
        onMouseLeave={hover.handleMouseLeave}
      >
        {hover.mode !== "Resting" && (
          <ContextMenu
            position="absolute"
            top={4}
            right={4}
            onOpen={hover.handleOpen}
            onClose={hover.handleClose}
          >
            <PaneOption as="a" href={link.url} target="_blank">
              Open in new tab
            </PaneOption>
          </ContextMenu>
        )}

        <File onClick={handleClick} name={link.title ?? link.display}>
          <Box
            width="100%"
            height="100%"
            border="1px solid"
            borderColor="secondary"
          >
            <Box
              px={4}
              py={3}
              borderBottom="1px solid"
              borderColor="secondary"
              color="secondary"
              fontSize={0}
            >
              <Truncate>{link.display}</Truncate>
            </Box>

            <Box p={3}>
              <Tag mr={2}>{link.state}</Tag>
              <Tag>{link.kind}</Tag>
            </Box>
          </Box>
        </File>
      </Box>
    </>
  );
};
