import { Modal, Tag, File, Box } from "@auspices/eos";
import React, { useState } from "react";
import { gql } from "urql";
import { ArtworkEditionsEdition_EditionFragment } from "../../generated/graphql";
import { ArtworkEditionsEditionForm } from "./ArtworkEditionsEditionForm";

gql`
  fragment ArtworkEditionsEdition_edition on Edition {
    ...ArtworkEditionsEditionForm_edition
    collector
    notes
    state
  }
`;

type ArtworkEditionsEditionProps = {
  artworkId: string;
  edition: ArtworkEditionsEdition_EditionFragment;
};

export const ArtworkEditionsEdition: React.FC<ArtworkEditionsEditionProps> = ({
  artworkId,
  edition,
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
            artworkId={artworkId}
            onDone={handleClose}
            edition={edition}
          />
        </Modal>
      )}

      <File
        onClick={handleClick}
        name={edition.collector ? `Collection of ${edition.collector}` : ""}
      >
        <Box
          width="100%"
          height="100%"
          border="1px solid"
          borderColor="tertiary"
        >
          {edition.notes && (
            <Box
              px={4}
              py={3}
              borderBottom="1px solid"
              borderColor="tertiary"
              color="secondary"
              fontSize={0}
            >
              {edition.notes}
            </Box>
          )}

          <Box p={3}>
            <Tag>{edition.state}</Tag>
          </Box>
        </Box>
      </File>
    </>
  );
};
