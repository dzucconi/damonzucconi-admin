import React, { useState } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/react-hooks";
import { useAlerts } from "@auspices/eos";
import { AddArtworkMutation } from "../generated/types/AddArtworkMutation";
import { useHistory } from "react-router";
import { ArtworkAttributes, Attributes } from "../components/ArtworkAttributes";

const ADD_ARTWORK_MUTATION = gql`
  mutation AddArtworkMutation($attributes: ArtworkAttributes!) {
    add_artwork(input: { attributes: $attributes }) {
      artwork {
        id
        slug
      }
    }
  }
`;

enum Mode {
  Resting,
  Saving,
  Error,
  Saved,
}

export const ArtworkNewPage: React.FC = () => {
  const history = useHistory();

  const { sendError, sendNotification } = useAlerts();

  const [mode, setMode] = useState(Mode.Resting);

  const [addArtwork] = useMutation<AddArtworkMutation>(ADD_ARTWORK_MUTATION);

  const handleSubmit = async (attributes: Attributes) => {
    setMode(Mode.Saving);
    sendNotification({ body: "saving" });

    try {
      const response = await addArtwork({ variables: { attributes } });

      sendNotification({ body: "added artwork successfully" });
      setMode(Mode.Saved);

      const { id } = response.data!.add_artwork!.artwork;

      history.push(`/artwork/${id}`);
    } catch (err) {
      sendError({ body: err.message });
      setMode(Mode.Error);
    }
  };

  return (
    <>
      <Helmet>
        <title>New Artwork</title>
      </Helmet>

      <ArtworkAttributes
        onSubmit={handleSubmit}
        label={
          {
            [Mode.Resting]: "add",
            [Mode.Saving]: "adding",
            [Mode.Error]: "error",
            [Mode.Saved]: "added",
          }[mode]
        }
      />
    </>
  );
};
