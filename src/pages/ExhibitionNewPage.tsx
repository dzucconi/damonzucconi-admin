import React, { useState } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useAlerts } from "@auspices/eos";
import { useHistory } from "react-router";
import { ExhibitionAttributes } from "../components/ExhibitionAttributes";
import {
  ExhibitionAttributes as Attributes,
  useAddExhibitionMutation,
} from "../generated/graphql";

gql`
  mutation AddExhibitionMutation($attributes: ExhibitionAttributes!) {
    add_exhibition(input: { attributes: $attributes }) {
      exhibition {
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

export const ExhibitionNewPage: React.FC = () => {
  const history = useHistory();

  const { sendError, sendNotification } = useAlerts();

  const [mode, setMode] = useState(Mode.Resting);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, addExhibition] = useAddExhibitionMutation();

  const handleSubmit = async (attributes: Attributes) => {
    setMode(Mode.Saving);
    sendNotification({ body: "Saving" });

    try {
      const response = await addExhibition({ attributes });

      sendNotification({ body: "Added exhibition successfully" });
      setMode(Mode.Saved);

      const { id } = response.data!.add_exhibition!.exhibition;

      history.push(`/exhibitions/${id}`);
    } catch (err) {
      sendError({ body: (err as Error).message });
      setMode(Mode.Error);
    }
  };

  return (
    <>
      <Helmet>
        <title>New Exhibition</title>
      </Helmet>

      <ExhibitionAttributes
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
