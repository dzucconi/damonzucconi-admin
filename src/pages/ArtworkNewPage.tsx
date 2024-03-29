import React, { useState } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useAlerts } from "@auspices/eos";
import { useHistory } from "react-router";
import { ArtworkAttributes } from "../components/ArtworkAttributes";
import {
  ArtworkAttributes as Attributes,
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

  const handleSubmit = async (attributes: Attributes) => {
    setMode(Mode.Saving);
    sendNotification({ body: "Saving" });

    try {
      const response = await addArtwork({ attributes });

      sendNotification({ body: "Added artwork successfully" });
      setMode(Mode.Saved);

      const { id } = response.data!.add_artwork!.artwork;

      history.push(`/artworks/${id}`);
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
            [Mode.Resting]: "Add",
            [Mode.Saving]: "Adding",
            [Mode.Error]: "Error",
            [Mode.Saved]: "Added",
          }[mode]
        }
      />
    </>
  );
};
