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
  onChange?(attributes: Attributes): void;
  onSubmit(attributes: Attributes): void;
};

export const ArtworkAttributes: React.FC<ArtworkAttributesProps> = ({
  label = "add",
  defaults,
  onChange,
  onSubmit,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm<Attributes>({
    defaultValues: {
      title: defaults?.title ?? "",
      year: defaults?.year ?? new Date().getFullYear(),
      material: defaults?.material,
      state: defaults?.state ?? State.Draft,
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
          label="state"
          options={[
            { value: "DRAFT", label: "draft" },
            { value: "PUBLISHED", label: "published" },
            { value: "SELECTED", label: "selected" },
            { value: "ARCHIVED", label: "archived" },
          ]}
          value={getValues().state}
          onChange={(value: State) => {
            setValue("state", value);
          }}
        />

        <Field
          label="title"
          input={{
            placeholder: "required",
            ...register("title", { required: true }),
          }}
        />

        <Field
          label="year"
          input={{
            type: "number",
            placeholder: "required",
            ...register("year", { required: true, valueAsNumber: true }),
          }}
        />

        <Field
          label="material"
          input={{
            placeholder: "optional",
            ...register("material"),
          }}
        />

        <Stack>
          <Pill>dimensions</Pill>
          <Stack direction={["vertical", "vertical", "vertical", "horizontal"]}>
            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="width"
              {...register("width", { valueAsNumber: true })}
            />

            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="height"
              {...register("height", { valueAsNumber: true })}
            />

            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="depth"
              {...register("depth", { valueAsNumber: true })}
            />

            <Input placeholder="unit" {...register("unit")} />
          </Stack>
        </Stack>

        <Field
          label="duration"
          input={{
            placeholder: "00:00:00",
            ...register("duration"),
          }}
        />

        <Pill>gloss</Pill>
        <Input
          as="textarea"
          placeholder="A brief explanation; marginal"
          {...register("gloss")}
        />

        <Pill>description</Pill>
        <Input
          as="textarea"
          placeholder="A longer contextual text"
          {...register("description")}
        />

        <Button type="submit">{label}</Button>
      </Stack>
    </form>
  );
};
