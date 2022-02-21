import React from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router";
import { Stack, Loading, useAlerts, Button } from "@auspices/eos";
import {
  useExhibitionShowPageQuery,
  useExhibitionShowPageUpdateMutation,
  ExhibitionAttributes as Attributes,
} from "../generated/graphql";
import { ExhibitionAttributes } from "../components/ExhibitionAttributes";
import { ExhibitionImages } from "../components/ExhibitionImages";

gql`
  fragment ExhibitionShowPageExhibitionFragment on Exhibition {
    ...ExhibitionAttributesFragment
    ...ExhibitionImagesFragment
    id
    title
    slug
  }
`;

gql`
  query ExhibitionShowPageQuery($id: ID!) {
    exhibition(id: $id) {
      ...ExhibitionShowPageExhibitionFragment
    }
  }
`;

gql`
  mutation ExhibitionShowPageUpdateMutation(
    $id: ID!
    $attributes: UpdateExhibitionAttributes!
  ) {
    update_exhibition(input: { id: $id, attributes: $attributes }) {
      exhibition {
        ...ExhibitionShowPageExhibitionFragment
      }
    }
  }
`;

export const ExhibitionShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { sendError, sendNotification } = useAlerts();

  const history = useHistory();

  const [{ data, fetching, error }] = useExhibitionShowPageQuery({
    variables: { id },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateExihibition] = useExhibitionShowPageUpdateMutation();

  const handleSubmit = async (attributes: Attributes) => {
    sendNotification({ body: "Updating exhibition" });

    try {
      const response = await updateExihibition({ id, attributes });

      const { exhibition: updatedExhibition } =
        response.data!.update_exhibition!;

      sendNotification({ body: `updated ${updatedExhibition.title}` });

      // Slug updated; redirect
      if (updatedExhibition.slug !== id) {
        history.push(`/exhibitions/${updatedExhibition.slug}`);
      }
    } catch (err) {
      sendError({ body: (err as Error).message });
    }
  };

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const { exhibition } = data;

  if (!exhibition) return null;

  return (
    <>
      <Helmet>
        <title>{exhibition.title}</title>
      </Helmet>

      <Stack>
        <Button
          as="a"
          href={`https://www.damonzucconi.com/exhibitions/${exhibition.slug}`}
          target="_blank"
        >
          View live page
        </Button>

        <ExhibitionAttributes
          defaults={exhibition}
          onSubmit={handleSubmit}
          label="Save"
        />

        <ExhibitionImages exhibition={exhibition} />
      </Stack>
    </>
  );
};
