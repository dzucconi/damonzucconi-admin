import { Button, Input, Select, Stack, useAlerts } from "@auspices/eos";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "urql";
import {
  Kind,
  LinkAttributes,
  State,
  useAddLinkMutation,
  ArtworkLinksLinkForm_LinkFragment,
  useUpdateLinkMutation,
} from "../../generated/graphql";

gql`
  mutation AddLink($artworkId: ID!, $attributes: LinkAttributes!) {
    add_artwork_entity(
      input: { id: $artworkId, entity: { link: $attributes } }
    ) {
      artwork {
        ...ArtworkLinksFragment
      }
    }
  }
`;

gql`
  mutation UpdateLink(
    $artworkId: ID!
    $linkId: ID!
    $attributes: UpdateLinkAttributes!
  ) {
    update_artwork_entity(
      input: { id: $artworkId, entity: { id: $linkId, link: $attributes } }
    ) {
      artwork {
        ...ArtworkLinksFragment
      }
    }
  }
`;

gql`
  fragment ArtworkLinksLinkForm_link on Link {
    id
    state
    kind
    url
    title
  }
`;

type ArtworkLinksLinkFormProps = {
  link?: ArtworkLinksLinkForm_LinkFragment;
  artworkId: string;
  onDone(): void;
};

export const ArtworkLinksLinkForm: React.FC<ArtworkLinksLinkFormProps> = ({
  link,
  artworkId,
  onDone,
}) => {
  const { register, handleSubmit, getValues, setValue } =
    useForm<LinkAttributes>({
      defaultValues: {
        state: link?.state ?? State.Published,
        kind: link?.kind ?? Kind.Canonical,
        url: link?.url,
        title: link?.title,
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, addLink] = useAddLinkMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, updateLink] = useUpdateLinkMutation();

  const { sendError, sendNotification } = useAlerts();

  const handleSave = () => {
    return handleSubmit(async (values) => {
      try {
        if (link) {
          sendNotification({ body: "Updating..." });
          await updateLink({ artworkId, linkId: link.id, attributes: values });
          sendNotification({ body: "Link updated" });
        } else {
          sendNotification({ body: "Adding..." });
          await addLink({ artworkId, attributes: values });
          sendNotification({ body: "Link added" });
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
        <Stack direction="horizontal">
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

          <Select
            zIndex={1}
            flex={1}
            label="Kind"
            options={Object.entries(Kind).map(([label, value]) => ({
              label,
              value,
            }))}
            value={getValues().kind}
            onChange={(value: Kind) => {
              setValue("kind", value);
            }}
          />
        </Stack>

        <Input placeholder="Title" {...register("title")} />

        <Input placeholder="URL" type="url" required {...register("url")} />

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};
