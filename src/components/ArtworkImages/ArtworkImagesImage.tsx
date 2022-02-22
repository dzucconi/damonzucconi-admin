import {
  Input,
  Cell,
  Stack,
  Button,
  ResponsiveImage,
  File,
  Modal,
  useAlerts,
  useConfirm,
  Box,
  ContextMenu,
  PaneOption,
} from "@auspices/eos";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gql } from "urql";
import {
  ArtworkImagesImage_ImageFragment,
  UpdateImageAttributes,
  useUpdateImageMutation,
  useRemoveImageMutation,
} from "../../generated/graphql";
import { useHover } from "../../hooks/useHover";

gql`
  mutation UpdateImage(
    $artworkId: ID!
    $imageId: ID!
    $attributes: UpdateImageAttributes!
  ) {
    update_artwork_entity(
      input: { id: $artworkId, entity: { id: $imageId, image: $attributes } }
    ) {
      artwork {
        images {
          ...ArtworkImagesImage_image
        }
      }
    }
  }
`;

gql`
  mutation RemoveImage($artworkId: ID!, $imageId: ID!) {
    remove_artwork_entity(
      input: { id: $artworkId, entity: { id: $imageId, type: IMAGE } }
    ) {
      artwork {
        ...ArtworkImagesFragment
      }
    }
  }
`;

gql`
  fragment ArtworkImagesImage_image on Image {
    id
    width
    height
    title
    description
    url
    thumbnail: resized(width: 250, height: 250) {
      height
      width
      urls {
        _1x
        _2x
      }
    }
  }
`;

type ArtworkImagesImageProps = {
  artworkId: string;
  image: ArtworkImagesImage_ImageFragment;
};

export const ArtworkImagesImage: React.FC<ArtworkImagesImageProps> = ({
  artworkId,
  image,
}) => {
  const [mode, setMode] = useState<"Pending" | "Open">("Pending");

  const handleClick = () => {
    setMode("Open");
  };

  const handleClose = () => {
    setMode("Pending");
    shouldClose.current = false;
  };

  const shouldClose = useRef(false);

  const handleSaveAndClose = () => {
    shouldClose.current = true;
  };

  const { register, handleSubmit } = useForm<UpdateImageAttributes>({
    defaultValues: {
      title: image.title,
      description: image.description,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, updateImage] = useUpdateImageMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_b, removeImage] = useRemoveImageMutation();

  const { sendNotification, sendError } = useAlerts();

  const handleSave = () => {
    return handleSubmit(async (values) => {
      sendNotification({ body: "Saving..." });

      try {
        await updateImage({
          artworkId,
          imageId: image.id,
          attributes: values,
        });

        sendNotification({ body: "Image updated" });

        if (shouldClose.current) {
          handleClose();
        }
      } catch (err) {
        console.error(err);
        sendError({ body: (err as Error).message });
      }
    });
  };

  const handleRemove = async () => {
    sendNotification({ body: "Removing..." });

    try {
      removeImage({ artworkId, imageId: image.id });
      sendNotification({ body: "Image removed" });
    } catch (err) {
      console.error(err);
      sendError({ body: (err as Error).message });
    }
  };

  const { Confirmation, requestConfirmation } = useConfirm({
    onConfirm: handleRemove,
  });

  const hover = useHover();

  return (
    <>
      <Confirmation>
        {`Delete ${image.title ?? "image"}. Are you sure?`}
      </Confirmation>

      {mode === "Open" && (
        <Modal zIndex={10} overlay onClose={handleClose}>
          <form onSubmit={handleSave()}>
            <Stack bg="background" width={600}>
              <Cell px={0} py={0} p={2}>
                <ResponsiveImage
                  srcs={[image.thumbnail.urls._1x, image.thumbnail.urls._2x]}
                  aspectWidth={image.thumbnail.width}
                  aspectHeight={image.thumbnail.height}
                  maxWidth={image.thumbnail.height}
                  maxHeight={image.thumbnail.height}
                  backgroundColor="tertiary"
                />
              </Cell>

              <Input placeholder="Title" {...register("title")} />

              <Input placeholder="Description" {...register("description")} />

              <Stack direction="horizontal">
                <Button
                  flex={1}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                >
                  Close
                </Button>

                <Button flex={1} type="submit" onClick={handleSaveAndClose}>
                  Save + Close
                </Button>

                <Button type="submit" flex={1}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </form>
        </Modal>
      )}

      <Box
        position="relative"
        width="100%"
        onMouseEnter={hover.handleMouseEnter}
        onMouseLeave={hover.handleMouseLeave}
      >
        {hover.mode !== "Resting" && (
          <ContextMenu
            position="absolute"
            top={4}
            right={4}
            zIndex={2}
            onOpen={hover.handleOpen}
            onClose={hover.handleClose}
          >
            <PaneOption as="a" href={image.url} target="_blank">
              Open in new tab
            </PaneOption>

            <PaneOption color="danger" onClick={requestConfirmation}>
              Delete
            </PaneOption>
          </ContextMenu>
        )}

        <File
          onClick={handleClick}
          name={image.title ?? ""}
          meta={image.description ?? `${image.width}×${image.height}`}
        >
          <ResponsiveImage
            srcs={[image.thumbnail.urls._1x, image.thumbnail.urls._2x]}
            aspectWidth={image.thumbnail.width}
            aspectHeight={image.thumbnail.height}
            maxWidth={image.thumbnail.width}
            maxHeight={image.thumbnail.height}
            backgroundColor="tertiary"
          />
        </File>
      </Box>
    </>
  );
};
