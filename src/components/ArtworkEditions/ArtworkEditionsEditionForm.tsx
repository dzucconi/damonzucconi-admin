import { Button, Cell, Input, Select, Stack, useAlerts } from "@auspices/eos";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "urql";
import {
  EditionAttributes,
  useAddEditionMutation,
  ArtworkEditionsEditionForm_EditionFragment,
  useUpdateEditionMutation,
  useRemoveEditionMutation,
  EditionState,
} from "../../generated/graphql";

type ArtworkEditionsEditionFormProps = {
  edition?: ArtworkEditionsEditionForm_EditionFragment;
  artworkId: string;
  onDone(): void;
};

export const ArtworkEditionsEditionForm: React.FC<
  ArtworkEditionsEditionFormProps
> = ({ edition, artworkId, onDone }) => {
  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<EditionAttributes>({
      defaultValues: {
        state: edition?.state ?? EditionState.Available,
        location: edition?.location ?? "",
        attributable: edition?.is_attributable ?? false,
        notes: edition?.notes ?? "",
        collector: edition?.collector ?? "",
      },
    });

  const watchAttributable = watch("attributable");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, addEdition] = useAddEditionMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_b, updateEdition] = useUpdateEditionMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_c, removeEdition] = useRemoveEditionMutation();

  const { sendError, sendNotification } = useAlerts();

  const handleSave = () => {
    return handleSubmit(async (values) => {
      try {
        if (edition) {
          sendNotification({ body: "Updating..." });
          await updateEdition({
            artworkId,
            editionId: edition.id,
            attributes: values,
          });
          sendNotification({ body: "Edition updated" });
        } else {
          sendNotification({ body: "Adding..." });
          await addEdition({ artworkId, attributes: values });
          sendNotification({ body: "Edition added" });
        }

        onDone();
      } catch (err) {
        console.log(err);
        sendError({ body: (err as Error).message });
      }
    });
  };

  const handleDelete = async () => {
    if (!edition) return;

    try {
      sendNotification({ body: "Deleting..." });
      await removeEdition({ artworkId, editionId: edition.id });
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
        <Stack direction="horizontal">
          <Select
            zIndex={1}
            flex={1}
            label="State"
            options={Object.entries(EditionState).map(([label, value]) => ({
              label,
              value,
            }))}
            value={getValues().state}
            onChange={(value: EditionState) => {
              setValue("state", value);
            }}
          />
        </Stack>

        <Input placeholder="Collector" {...register("collector")} />

        <Input placeholder="Location" {...register("location")} />

        <Cell>Is Attributable?</Cell>

        <Stack direction="horizontal">
          <Button
            flex={1}
            selected={!!watchAttributable}
            type="button"
            onClick={() => {
              setValue("attributable", true);
            }}
          >
            Yes
          </Button>

          <Button
            flex={1}
            selected={!watchAttributable}
            type="button"
            onClick={() => {
              setValue("attributable", false);
            }}
          >
            No
          </Button>
        </Stack>

        <Input
          placeholder="Notes"
          as="textarea"
          rows={6}
          {...register("notes")}
        />

        <Stack direction="horizontal">
          {edition && (
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

gql`
  mutation AddEdition($artworkId: ID!, $attributes: EditionAttributes!) {
    add_artwork_entity(
      input: { id: $artworkId, entity: { edition: $attributes } }
    ) {
      artwork {
        ...ArtworkEditionsFragment
      }
    }
  }
`;

gql`
  mutation UpdateEdition(
    $artworkId: ID!
    $editionId: ID!
    $attributes: UpdateEditionAttributes!
  ) {
    update_artwork_entity(
      input: {
        id: $artworkId
        entity: { id: $editionId, edition: $attributes }
      }
    ) {
      artwork {
        ...ArtworkEditionsFragment
      }
    }
  }
`;

gql`
  mutation RemoveEdition($artworkId: ID!, $editionId: ID!) {
    remove_artwork_entity(
      input: { id: $artworkId, entity: { id: $editionId, type: LINK } }
    ) {
      artwork {
        ...ArtworkEditionsFragment
      }
    }
  }
`;

gql`
  fragment ArtworkEditionsEditionForm_edition on Edition {
    id
    collector
    is_attributable
    notes
    state
    location
  }
`;
