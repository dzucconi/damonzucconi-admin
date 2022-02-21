import React from "react";
import gql from "graphql-tag";
import { Stack, Plus, Grid } from "@auspices/eos";
import {
  ExhibitionImagesFragment,
  useAddExhibitionImageMutation,
} from "../../generated/graphql";
import { FileUploadButton } from "../FileUploadButton";
import { ExhibitionImagesImage } from "./ExhibitionImagesImage";

gql`
  fragment ExhibitionImagesFragment on Exhibition {
    id
    slug
    images {
      id
      ...ExhibitionImagesImage_image
    }
  }
`;

gql`
  mutation AddExhibitionImageMutation($id: ID!, $image: ImageAttributes!) {
    add_exhibition_entity(input: { id: $id, entity: { image: $image } }) {
      exhibition {
        id
        ...ExhibitionImagesFragment
      }
    }
  }
`;

type ExhibitionImagesProps = {
  exhibition: ExhibitionImagesFragment;
};

export const ExhibitionImages: React.FC<ExhibitionImagesProps> = ({
  exhibition,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, addExhibitionImage] = useAddExhibitionImageMutation();

  return (
    <Stack {...rest}>
      <FileUploadButton
        id="ExhibitionImages"
        fileKey={`images/${exhibition.slug}`}
        onUpload={(url) => {
          return addExhibitionImage({ id: exhibition.id, image: { url } });
        }}
      >
        <Plus size={4} strokeWidth="1px" mr={3} />
        Image
      </FileUploadButton>

      {exhibition.images.length > 0 && (
        <Grid my={6}>
          {exhibition.images.map((image) => {
            return (
              <ExhibitionImagesImage
                key={image.id}
                exhibitionId={exhibition.id}
                image={image}
              />
            );
          })}
        </Grid>
      )}
    </Stack>
  );
};
