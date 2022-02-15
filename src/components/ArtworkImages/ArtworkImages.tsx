import React from "react";
import gql from "graphql-tag";
import { Grid, Stack, Plus, ResponsiveImage } from "@auspices/eos";
import {
  ArtworkImagesFragment,
  useAddArtworkImageMutation,
} from "../../generated/graphql";
import { FileUploadButton } from "../FileUploadButton";

export const ARTWORK_IMAGES_FRAGMENT = gql`
  fragment ArtworkImagesFragment on Artwork {
    id
    slug
    images {
      id
      thumbnail: resized(width: 256, height: 256) {
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
  mutation AddArtworkImageMutation($id: ID!, $image: ImageAttributes!) {
    add_artwork_entity(input: { id: $id, entity: { image: $image } }) {
      artwork {
        id
        ...ArtworkImagesFragment
      }
    }
  }
`;

type ArtworkImagesProps = {
  artwork: ArtworkImagesFragment;
};

export const ArtworkImages: React.FC<ArtworkImagesProps> = ({
  artwork,
  ...rest
}) => {
  const [_, addArtworkImage] = useAddArtworkImageMutation();

  return (
    <Stack {...rest}>
      <FileUploadButton
        slug={artwork.slug}
        onUpload={(url) => {
          return addArtworkImage({ id: artwork.id, image: { url } });
        }}
      >
        <Plus size={4} strokeWidth="1px" mr={3} />
        image
      </FileUploadButton>

      <Grid p={6}>
        {artwork.images.map((image) => {
          return (
            image.thumbnail && (
              <ResponsiveImage
                key={image.id}
                srcs={[image.thumbnail.urls._1x, image.thumbnail.urls._2x]}
                aspectWidth={image.thumbnail.width}
                aspectHeight={image.thumbnail.height}
                maxWidth={image.thumbnail.width}
                maxHeight={image.thumbnail.height}
                backgroundColor="tertiary"
              />
            )
          );
        })}
      </Grid>
    </Stack>
  );
};
