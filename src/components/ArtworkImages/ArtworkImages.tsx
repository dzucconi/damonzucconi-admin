import React from "react";
import gql from "graphql-tag";
import { Grid, Stack, Plus, ResponsiveImage } from "@auspices/eos";
import { ArtworkImagesFragment } from "../../generated/types/ArtworkImagesFragment";
import { FileUploadButton } from "../FileUploadButton";

export const ARTWORK_IMAGES_FRAGMENT = gql`
  fragment ArtworkImagesFragment on Artwork {
    id
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

type ArtworkImagesProps = {
  artwork: ArtworkImagesFragment;
};

export const ArtworkImages: React.FC<ArtworkImagesProps> = ({
  artwork,
  ...rest
}) => {
  return (
    <Stack {...rest}>
      <FileUploadButton
        onUpload={(url) => {
          console.log(url);
          return Promise.resolve();
        }}
      >
        <Plus size={4} strokeWidth="1px" mr={3} />
        image
      </FileUploadButton>

      <Grid p={6}>
        {artwork.images.map((image) => {
          return (
            image?.thumbnail && (
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
