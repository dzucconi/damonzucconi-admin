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
} from "../generated/graphql";

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

export const ArtworkShowPage: React.FC = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { sendError, sendNotification } = useAlerts();

  const [{ data, fetching, error }] = useArtworkShowPageQuery({
    variables: { id },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateArtwork] = useArtworkShowPageUpdateMutation();

  const handleSubmit = async (attributes: Attributes) => {
    sendNotification({ body: "updating" });

    try {
      const response = await updateArtwork({ id, attributes });

      const { artwork: updatedArtwork } = response.data!.update_artwork!;

      sendNotification({ body: `updated ${updatedArtwork.title}` });

      // Slug updated; redirect
      if (updatedArtwork.slug !== id) {
        history.push(`/artwork/${updatedArtwork.slug}`);
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

  const { artwork } = data;
  const [image] = artwork.primaryImage;

  if (!artwork) return null;

  return (
    <>
      <Helmet>
        <title>{artwork.title}</title>
      </Helmet>

      <Stack>
        <Button
          as="a"
          href={`https://www.damonzucconi.com/artworks/${artwork.slug}`}
          target="_blank"
        >
          View live page
        </Button>

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
