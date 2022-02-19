import {
  Input,
  Stack,
  Button,
  File,
  Modal,
  useAlerts,
  EmptyFrame,
  Cell,
  Select,
  Box,
  ContextMenu,
  PaneOption,
  useConfirm,
} from "@auspices/eos";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gql } from "urql";
import {
  ArtworkAttachmentsAttachment_AttachmentFragment,
  State,
  UpdateAttachmentAttributes,
  useRemoveAttachmentMutation,
  useUpdateAttachmentMutation,
} from "../../generated/graphql";
import { useHover } from "../../hooks/useHover";

gql`
  mutation UpdateAttachment(
    $artworkId: ID!
    $attachmentId: ID!
    $attributes: UpdateAttachmentAttributes!
  ) {
    update_artwork_entity(
      input: {
        id: $artworkId
        entity: { id: $attachmentId, attachment: $attributes }
      }
    ) {
      artwork {
        attachments {
          ...ArtworkAttachmentsAttachment_attachment
        }
      }
    }
  }
`;

gql`
  mutation RemoveAttachment($artworkId: ID!, $attachmentId: ID!) {
    remove_artwork_entity(
      input: { id: $artworkId, entity: { id: $attachmentId, type: ATTACHMENT } }
    ) {
      artwork {
        ...ArtworkAttachmentsFragment
      }
    }
  }
`;

gql`
  fragment ArtworkAttachmentsAttachment_attachment on Attachment {
    id
    file_name
    file_type
    state
    title
    url
  }
`;

type ArtworkAttachmentsAttachmentProps = {
  artworkId: string;
  attachment: ArtworkAttachmentsAttachment_AttachmentFragment;
};

export const ArtworkAttachmentsAttachment: React.FC<
  ArtworkAttachmentsAttachmentProps
> = ({ artworkId, attachment }) => {
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

  const { register, handleSubmit, getValues, setValue } =
    useForm<UpdateAttachmentAttributes>({
      defaultValues: {
        state: attachment.state,
        title: attachment.title,
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, updateAttachment] = useUpdateAttachmentMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_b, removeAttachment] = useRemoveAttachmentMutation();

  const { sendNotification, sendError } = useAlerts();

  const handleSave = () => {
    return handleSubmit(async (values) => {
      sendNotification({ body: "Saving..." });

      try {
        await updateAttachment({
          artworkId,
          attachmentId: attachment.id,
          attributes: values,
        });

        sendNotification({ body: "Attachment updated" });

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
      removeAttachment({ artworkId, attachmentId: attachment.id });
      sendNotification({ body: "Attachment removed" });
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
      <Confirmation zIndex={10}>
        {`Delete ${attachment.file_name}. Are you sure?`}
      </Confirmation>

      {mode === "Open" && (
        <Modal zIndex={10} overlay onClose={handleClose}>
          <form onSubmit={handleSave()}>
            <Stack bg="background" width={600}>
              <Cell color="secondary">{attachment.file_name}</Cell>

              <Select
                zIndex={1}
                flex={1}
                label="State"
                options={Object.entries(State).map(([label, value]) => ({
                  label,
                  value,
                }))}
                value={getValues().state}
                onChange={(value: State) => {
                  setValue("state", value);
                }}
              />

              <Input placeholder="Title" {...register("title")} />

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
            onOpen={hover.handleOpen}
            onClose={hover.handleClose}
          >
            <PaneOption onClick={requestConfirmation}>Delete</PaneOption>
          </ContextMenu>
        )}

        <File
          onClick={handleClick}
          name={attachment.title!}
          meta={attachment.file_name}
        >
          <EmptyFrame
            width="100%"
            height="100%"
            border="1px solid"
            borderColor="tertiary"
            color="tertiary"
          />
        </File>
      </Box>
    </>
  );
};
