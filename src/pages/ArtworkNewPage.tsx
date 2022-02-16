import React, { useState } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useAlerts } from "@auspices/eos";
import { useHistory } from "react-router";
import { ArtworkAttributes } from "../components/ArtworkAttributes";
import {
  ArtworkAttributes as TArtworkAttributes,
  useAddArtworkMutation,
} from "../generated/graphql";

gql`
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, addArtwork] = useAddArtworkMutation();

  const handleSubmit = async (attributes: TArtworkAttributes) => {
    setMode(Mode.Saving);
    sendNotification({ body: "saving" });

    try {
      const response = await addArtwork({ attributes });

      sendNotification({ body: "added artwork successfully" });
      setMode(Mode.Saved);

      const { id } = response.data!.add_artwork!.artwork;

      history.push(`/artwork/${id}`);
    } catch (err) {
      sendError({ body: (err as Error).message });
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
