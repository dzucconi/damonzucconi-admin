import { Button, Input, Stack, useAlerts } from "@auspices/eos";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "urql";
import {
  EmbedAttributes,
  useAddEmbedMutation,
  ArtworkEmbedsEmbedForm_EmbedFragment,
  useUpdateEmbedMutation,
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
  const [_, addEmbed] = useAddEmbedMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, updateEmbed] = useUpdateEmbedMutation();

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

  return (
    <form onSubmit={handleSave()}>
      <Stack width={600} bg="background">
        <Input as="textarea" placeholder="HTML" {...register("html")} />

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};
