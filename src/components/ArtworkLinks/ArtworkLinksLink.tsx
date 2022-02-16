import { Button, Modal, Tag } from "@auspices/eos";
import React, { useState } from "react";
import { gql } from "urql";
import { ArtworkLinksLink_LinkFragment } from "../../generated/graphql";
import { ArtworkLinksLinkForm } from "./ArtworkLinksLinkForm";

gql`
  fragment ArtworkLinksLink_link on Link {
    title
    url
    state
    kind
    ...ArtworkLinksLinkForm_link
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

      <Button flex={1} onClick={handleClick} justifyContent="flex-start">
        {link.title ?? link.url}
        <Tag ml={4}>{link.state}</Tag>
        <Tag ml={4}>{link.kind}</Tag>
      </Button>
    </>
  );
};
