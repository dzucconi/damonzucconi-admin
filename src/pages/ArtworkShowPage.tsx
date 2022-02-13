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
} from "@auspices/eos";
import {
  ArtworkImages,
  ARTWORK_IMAGES_FRAGMENT,
  ArtworkAttachments,
  ARTWORK_ATTACHMENTS_FRAGMENT,
  ArtworkEditions,
  ARTWORK_EDITIONS_FRAGMENT,
  ArtworkLinks,
  ARTWORK_LINKS_FRAGMENT,
  ArtworkEmbeds,
  ARTWORK_EMBEDS_FRAGMENT,
} from "../components";
import {
  ArtworkAttributes,
  ARTWORK_ATTRIBUTES_FRAGMENT,
  Attributes,
} from "../components/ArtworkAttributes";
import { useHistory } from "react-router-dom";
import {
  ArtworkAttributes as TArtworkAttributes,
  useArtworkShowPageQuery,
  useArtworkShowPageUpdateMutation,
} from "../generated/graphql";

export const ARTWORK_SHOW_PAGE_ARTWORK_FRAGMENT = gql`
  fragment ArtworkShowPageArtworkFragment on Artwork {
    id
    ...ArtworkAttributesFragment
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
    ...ArtworkImagesFragment
    ...ArtworkLinksFragment
    ...ArtworkEmbedsFragment
    ...ArtworkAttachmentsFragment
    ...ArtworkEditionsFragment
  }
  ${ARTWORK_ATTRIBUTES_FRAGMENT}
  ${ARTWORK_IMAGES_FRAGMENT}
  ${ARTWORK_LINKS_FRAGMENT}
  ${ARTWORK_EMBEDS_FRAGMENT}
  ${ARTWORK_ATTACHMENTS_FRAGMENT}
  ${ARTWORK_EDITIONS_FRAGMENT}
`;

export const ARTWORK_SHOW_PAGE_QUERY = gql`
  query ArtworkShowPageQuery($id: ID!) {
    artwork(id: $id) {
      ...ArtworkShowPageArtworkFragment
    }
  }
  ${ARTWORK_SHOW_PAGE_ARTWORK_FRAGMENT}
`;

export const ARTWORK_SHOW_PAGE_UPDATE_MUTATION = gql`
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
  ${ARTWORK_SHOW_PAGE_ARTWORK_FRAGMENT}
`;

export const ArtworkShowPage: React.FC = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { sendError, sendNotification } = useAlerts();

  const [{ data, fetching, error }] = useArtworkShowPageQuery({
    variables: { id },
  });

  const [_updateArtworkResult, updateArtwork] =
    useArtworkShowPageUpdateMutation();

  const handleSubmit = async (attributes: TArtworkAttributes) => {
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
      sendError({ body: err.message });
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
            label="update"
          />
        </Stack>

        <Pill>images</Pill>
        <ArtworkImages artwork={artwork} />

        <Pill>links</Pill>
        <ArtworkLinks artwork={artwork} />

        <Pill>editions</Pill>
        <ArtworkEditions artwork={artwork} />

        <Pill>embeds</Pill>
        <ArtworkEmbeds artwork={artwork} />

        <Pill>attachments</Pill>
        <ArtworkAttachments artwork={artwork} />
      </Stack>
    </>
  );
};
