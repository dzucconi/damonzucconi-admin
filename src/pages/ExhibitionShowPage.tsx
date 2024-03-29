import React from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router";
import {
  Stack,
  Loading,
  useAlerts,
  EmptyFrame,
  ResponsiveImage,
  Pill,
  Dropdown,
  PaneOption,
  useConfirm,
} from "@auspices/eos";
import {
  useExhibitionShowPageQuery,
  useExhibitionShowPageUpdateMutation,
  ExhibitionAttributes as Attributes,
  useDeleteExhibitionMutation,
} from "../generated/graphql";
import { ExhibitionAttributes } from "../components/ExhibitionAttributes";
import { ExhibitionImages } from "../components/ExhibitionImages";

export const ExhibitionShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { sendError, sendNotification } = useAlerts();

  const history = useHistory();

  const [{ data, fetching, error }] = useExhibitionShowPageQuery({
    variables: { id },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, updateExihibition] = useExhibitionShowPageUpdateMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_b, deleteExhibition] = useDeleteExhibitionMutation();

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

  const handleRemove = async () => {
    sendNotification({ body: "Deleting..." });

    try {
      deleteExhibition({ id: exhibition.id });
      sendNotification({ body: "Exhibition deleted. Redirecting..." });

      history.push("/exhibitions");
    } catch (err) {
      console.error(err);
      sendError({ body: (err as Error).message });
    }
  };

  const { Confirmation, requestConfirmation } = useConfirm({
    onConfirm: handleRemove,
  });

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const { exhibition } = data;
  const [image] = exhibition.primaryImage;

  if (!exhibition) return null;

  return (
    <>
      <Helmet>
        <title>{exhibition.title}</title>
      </Helmet>

      <Confirmation
        zIndex={10}
      >{`Delete ${exhibition.title}. Are you sure?`}</Confirmation>

      <Stack>
        <Dropdown label="Actions">
          <PaneOption
            as="a"
            href={`https://www.damonzucconi.com/exhibitions/${exhibition.slug}`}
            target="_blank"
          >
            View live page
          </PaneOption>

          <PaneOption color="danger" onClick={requestConfirmation}>
            Delete
          </PaneOption>
        </Dropdown>

        <Stack direction="horizontal">
          <Pill flex={1} px={0} py={0}>
            <EmptyFrame
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {image?.thumbnail && (
                <ResponsiveImage
                  srcs={[image.thumbnail.urls._1x, image.thumbnail.urls._2x]}
                  maxWidth={image.thumbnail.width}
                  maxHeight={image.thumbnail.height}
                  aspectWidth={image.thumbnail.width}
                  aspectHeight={image.thumbnail.height}
                  position="relative"
                  zIndex={1}
                />
              )}
            </EmptyFrame>
          </Pill>

          <ExhibitionAttributes
            flex={1.5}
            defaults={exhibition}
            onSubmit={handleSubmit}
            label="Save"
          />
        </Stack>

        <ExhibitionImages exhibition={exhibition} />
      </Stack>
    </>
  );
};

gql`
  fragment ExhibitionShowPageExhibitionFragment on Exhibition {
    ...ExhibitionAttributesFragment
    ...ExhibitionImagesFragment
    id
    title
    slug
    primaryImage: images(limit: 1) {
      id
      thumbnail: resized(width: 400, height: 400) {
        height
        width
        urls {
          _1x
          _2x
        }
      }
    }
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

gql`
  mutation DeleteExhibitionMutation($id: ID!) {
    delete_exhibition(input: { id: $id }) {
      query {
        ...ExhibitionIndexPageFragment
      }
    }
  }
`;
