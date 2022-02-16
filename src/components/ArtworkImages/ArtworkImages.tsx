import React from "react";
import gql from "graphql-tag";
import { Stack, Plus, Cell, Image, Input, Button, Grid } from "@auspices/eos";
import {
  ArtworkImagesFragment,
  useAddArtworkImageMutation,
} from "../../generated/graphql";
import { FileUploadButton } from "../FileUploadButton";
import { ArtworkImagesImage } from "./ArtworkImagesImage";

export const ARTWORK_IMAGES_FRAGMENT = gql`
  fragment ArtworkImagesFragment on Artwork {
    id
    slug
    images {
      id
      ...ArtworkImagesImage_image
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

      <Grid my={6}>
        {artwork.images.map((image) => {
          return (
            <ArtworkImagesImage
              key={image.id}
              artworkId={artwork.id}
              image={image}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};
