import React from "react";
import { Input, Stack, Pill, Field, Button, Select } from "@auspices/eos";
import gql from "graphql-tag";
import {
  ArtworkAttributesFragment,
  ArtworkAttributes as Attributes,
  State,
} from "../../generated/graphql";
import { useForm } from "react-hook-form";

export const ARTWORK_ATTRIBUTES_FRAGMENT = gql`
  fragment ArtworkAttributesFragment on Artwork {
    id
    slug
    state
    title
    year
    material
    dimensions {
      inches {
        width
        height
        depth
        unit
      }
    }
    duration
    gloss
    description
  }
`;

type ArtworkAttributesProps = {
  defaults?: ArtworkAttributesFragment;
  label?: string;
  onSubmit(attributes: Attributes): void;
};

export const ArtworkAttributes: React.FC<ArtworkAttributesProps> = ({
  label = "Add",
  defaults,
  onSubmit,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm<Attributes>({
    defaultValues: {
      state: defaults?.state ?? State.Draft,
      title: defaults?.title ?? "",
      year: defaults?.year ?? new Date().getFullYear(),
      material: defaults?.material,
      width: defaults?.dimensions?.inches?.width,
      height: defaults?.dimensions?.inches?.height,
      depth: defaults?.dimensions?.inches?.depth,
      unit: defaults?.dimensions?.inches?.unit,
      duration: defaults?.duration,
      gloss: defaults?.gloss,
      description: defaults?.description,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width="100%">
        <Select
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

        <Field
          label="Title"
          input={{
            placeholder: "Required",
            ...register("title", { required: true }),
          }}
        />

        <Field
          label="Year"
          input={{
            type: "number",
            placeholder: "Required",
            ...register("year", { required: true, valueAsNumber: true }),
          }}
        />

        <Field
          label="Material"
          input={{
            placeholder: "Optional",
            ...register("material"),
          }}
        />

        <Stack>
          <Pill>Dimensions</Pill>
          <Stack direction={["vertical", "vertical", "vertical", "horizontal"]}>
            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="Width"
              {...register("width", { valueAsNumber: true })}
            />

            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="Height"
              {...register("height", { valueAsNumber: true })}
            />

            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="Depth"
              {...register("depth", { valueAsNumber: true })}
            />

            <Input placeholder="Unit" {...register("unit")} />
          </Stack>
        </Stack>

        <Field
          label="Duration"
          input={{
            placeholder: "00:00:00",
            ...register("duration"),
          }}
        />

        <Pill>Gloss</Pill>
        <Input
          as="textarea"
          placeholder="A brief explanation; marginal"
          rows={4}
          {...register("gloss")}
        />

        <Pill>Description</Pill>
        <Input
          as="textarea"
          placeholder="A longer contextual text"
          rows={4}
          {...register("description")}
        />

        <Button type="submit">{label}</Button>
      </Stack>
    </form>
  );
};
