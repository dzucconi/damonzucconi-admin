import React from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import {
  Pill,
  Stack,
  EmptyFrame,
  ResponsiveImage,
  Loading,
  useAlerts,
  Button,
  useConfirm,
  Dropdown,
  PaneOption,
} from "@auspices/eos";
import {
  ArtworkImages,
  ArtworkAttachments,
  ArtworkEditions,
  ArtworkLinks,
  ArtworkEmbeds,
} from "../components";
import { ArtworkAttributes } from "../components/ArtworkAttributes";
import { useHistory } from "react-router-dom";
import {
  ArtworkAttributes as Attributes,
  useArtworkShowPageQuery,
  useArtworkShowPageUpdateMutation,
  useDeleteArtworkMutation,
} from "../generated/graphql";

export const ArtworkShowPage: React.FC = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { sendError, sendNotification } = useAlerts();

  const [{ data, fetching, error }] = useArtworkShowPageQuery({
    variables: { id },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, updateArtwork] = useArtworkShowPageUpdateMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_b, deleteArtwork] = useDeleteArtworkMutation();

  const handleSubmit = async (attributes: Attributes) => {
    sendNotification({ body: "Updating artwork" });

    try {
      const response = await updateArtwork({ id, attributes });

      const { artwork: updatedArtwork } = response.data!.update_artwork!;

      sendNotification({ body: `Updated ${updatedArtwork.title}` });

      // Slug updated; redirect
      if (updatedArtwork.slug !== id) {
        history.push(`/artworks/${updatedArtwork.slug}`);
      }
    } catch (err) {
      sendError({ body: (err as Error).message });
    }
  };

  const handleRemove = async () => {
    sendNotification({ body: "Deleting..." });

    try {
      deleteArtwork({ id: artwork.id });
      sendNotification({ body: "Artwork deleted. Redirecting..." });

      history.push("/artworks");
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

  const { artwork } = data;
  const [image] = artwork.primaryImage;

  if (!artwork) return null;

  return (
    <>
      <Helmet>
        <title>{artwork.title}</title>
      </Helmet>

      <Confirmation
        zIndex={10}
      >{`Delete ${artwork.title}. Are you sure?`}</Confirmation>

      <Stack>
        <Dropdown label="Actions">
          <PaneOption
            as="a"
            href={`https://www.damonzucconi.com/artworks/${artwork.slug}`}
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

          <ArtworkAttributes
            flex={1.5}
            defaults={artwork}
            onSubmit={handleSubmit}
            label="Update"
          />
        </Stack>

        <ArtworkImages artwork={artwork} />

        <ArtworkLinks artwork={artwork} />

        <ArtworkEmbeds artwork={artwork} />

        <ArtworkAttachments artwork={artwork} />

        <ArtworkEditions artwork={artwork} />
      </Stack>
    </>
  );
};

gql`
  fragment ArtworkShowPageArtworkFragment on Artwork {
    ...ArtworkAttributesFragment
    ...ArtworkImagesFragment
    ...ArtworkLinksFragment
    ...ArtworkEmbedsFragment
    ...ArtworkAttachmentsFragment
    ...ArtworkEditionsFragment
    id
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
  query ArtworkShowPageQuery($id: ID!) {
    artwork(id: $id) {
      ...ArtworkShowPageArtworkFragment
    }
  }
`;

gql`
  mutation ArtworkShowPageUpdateMutation(
    $id: ID!
    $attributes: UpdateArtworkAttributes!
  ) {
    update_artwork(input: { id: $id, attributes: $attributes }) {
      artwork {
        ...ArtworkShowPageArtworkFragment
      }
    }
  }
`;

gql`
  mutation DeleteArtworkMutation($id: ID!) {
    delete_artwork(input: { id: $id }) {
      query {
        ...ArtworkIndexPageFragment
      }
    }
  }
`;
