import { Button, Input, Stack, useAlerts } from "@auspices/eos";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "urql";
import {
  EmbedAttributes,
  ArtworkEmbedsEmbedForm_EmbedFragment,
  useAddEmbedMutation,
  useUpdateEmbedMutation,
  useRemoveEmbedMutation,
} from "../../generated/graphql";

gql`
  mutation AddEmbed($artworkId: ID!, $attributes: EmbedAttributes!) {
    add_artwork_entity(
      input: { id: $artworkId, entity: { embed: $attributes } }
    ) {
      artwork {
        ...ArtworkEmbedsFragment
      }
    }
  }
`;

gql`
  mutation UpdateEmbed(
    $artworkId: ID!
    $embedId: ID!
    $attributes: UpdateEmbedAttributes!
  ) {
    update_artwork_entity(
      input: { id: $artworkId, entity: { id: $embedId, embed: $attributes } }
    ) {
      artwork {
        ...ArtworkEmbedsFragment
      }
    }
  }
`;

gql`
  mutation RemoveEmbed($artworkId: ID!, $embedId: ID!) {
    remove_artwork_entity(
      input: { id: $artworkId, entity: { id: $embedId, type: EMBED } }
    ) {
      artwork {
        ...ArtworkEmbedsFragment
      }
    }
  }
`;

gql`
  fragment ArtworkEmbedsEmbedForm_embed on Embed {
    id
    html
  }
`;

type ArtworkEmbedsEmbedFormProps = {
  embed?: ArtworkEmbedsEmbedForm_EmbedFragment;
  artworkId: string;
  onDone(): void;
};

export const ArtworkEmbedsEmbedForm: React.FC<ArtworkEmbedsEmbedFormProps> = ({
  embed,
  artworkId,
  onDone,
}) => {
  const { register, handleSubmit } = useForm<EmbedAttributes>({
    defaultValues: { html: embed?.html ?? "" },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, addEmbed] = useAddEmbedMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_b, updateEmbed] = useUpdateEmbedMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_c, removeEmbed] = useRemoveEmbedMutation();

  const { sendError, sendNotification } = useAlerts();

  const handleSave = () => {
    return handleSubmit(async (values) => {
      try {
        if (embed) {
          sendNotification({ body: "Updating..." });
          await updateEmbed({
            artworkId,
            embedId: embed.id,
            attributes: values,
          });
          sendNotification({ body: "Embed updated" });
        } else {
          sendNotification({ body: "Adding..." });
          await addEmbed({ artworkId, attributes: values });
          sendNotification({ body: "Embed added" });
        }

        onDone();
      } catch (err) {
        console.log(err);
        sendError({ body: (err as Error).message });
      }
    });
  };

  const handleDelete = async () => {
    if (!embed) return;

    try {
      sendNotification({ body: "Deleting..." });
      await removeEmbed({ artworkId, embedId: embed.id });
      sendNotification({ body: "Embed deleted" });
      onDone();
    } catch (err) {
      console.log(err);
      sendError({ body: (err as Error).message });
    }
  };

  return (
    <form onSubmit={handleSave()}>
      <Stack width={600} bg="background">
        <Input as="textarea" placeholder="HTML" {...register("html")} />

        <Stack direction="horizontal">
          {embed && (
            <Button
              color="danger"
              type="button"
              onClick={handleDelete}
              flex={1}
            >
              Delete
            </Button>
          )}

          <Button type="submit" flex={1}>
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
