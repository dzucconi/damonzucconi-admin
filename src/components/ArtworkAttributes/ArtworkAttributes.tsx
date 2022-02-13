import React, { useState, useEffect } from "react";
import { Input, Stack, Pill, Field, Button, Select } from "@auspices/eos";
import gql from "graphql-tag";
import {
  ArtworkAttributesFragment,
  ArtworkAttributes as TArtworkAttributes,
  State,
} from "../../generated/graphql";

const DEFAULT_VALUES = {
  year: new Date().getFullYear(),
  state: "DRAFT",
};

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

export type Attributes = TArtworkAttributes;

// {
//   year: number;
//   state: string;
//   title?: string;
// } & Record<string, string | number | boolean>;

type ArtworkAttributesProps = {
  defaults?: ArtworkAttributesFragment;
  label?: string;
  onChange?(attributes: TArtworkAttributes): void;
  onSubmit(attributes: TArtworkAttributes): void;
};

export const ArtworkAttributes: React.FC<ArtworkAttributesProps> = ({
  label = "add",
  defaults = {} as ArtworkAttributesFragment,
  onChange,
  onSubmit,
}) => {
  const [attributes, setAttributes] = useState<Attributes>({
    title: "",
    state: (defaults.state?.toUpperCase() ?? DEFAULT_VALUES.state) as State,
    year: defaults.year ?? DEFAULT_VALUES.year,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.currentTarget;

    switch (type) {
      case "number":
        setAttributes((prevAttributes) => ({
          ...prevAttributes,
          [name]: parseFloat(value),
        }));
        break;
      default:
        setAttributes((prevAttributes) => ({
          ...prevAttributes,
          [name]: value,
        }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return onSubmit(attributes);
  };

  useEffect(() => {
    onChange && onChange(attributes);
  }, [attributes, onChange]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack width="100%">
        <Select
          label="state"
          options={[
            { value: "DRAFT", label: "draft" },
            { value: "PUBLISHED", label: "published" },
            { value: "SELECTED", label: "selected" },
            { value: "ARCHIVED", label: "archived" },
          ]}
          value={attributes.state}
          onChange={(value) => {
            handleChange({
              currentTarget: {
                name: "state",
                value: `${value}`,
                type: "string",
              },
            } as any);
          }}
        />

        <Field
          label="title"
          input={{
            name: "title",
            placeholder: "required",
            required: true,
            onChange: handleChange,
            defaultValue: defaults.title as string,
          }}
        />

        <Field
          label="year"
          input={{
            type: "number",
            name: "year",
            placeholder: "required",
            required: true,
            onChange: handleChange,
            defaultValue: defaults.year,
          }}
        />

        <Field
          label="material"
          input={{
            name: "material",
            placeholder: "optional",
            onChange: handleChange,
            defaultValue: defaults.material as string,
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
              name="width"
              onChange={handleChange}
              defaultValue={defaults.dimensions?.inches?.width as number}
            />
            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="height"
              name="height"
              onChange={handleChange}
              defaultValue={defaults.dimensions?.inches?.height as number}
            />
            <Input
              flex={1}
              type="number"
              step="0.01"
              placeholder="depth"
              name="depth"
              onChange={handleChange}
              defaultValue={defaults.dimensions?.inches?.depth as number}
            />
            <Input
              placeholder="unit"
              name="unit"
              onChange={handleChange}
              defaultValue={defaults.dimensions?.inches?.unit as string}
            />
          </Stack>
        </Stack>

        <Field
          label="duration"
          input={{
            name: "duration",
            placeholder: "00:00:00",
            onChange: handleChange,
            defaultValue: defaults.duration as string,
          }}
        />

        <Pill>gloss</Pill>
        <Input
          as="textarea"
          placeholder="A brief explanation; marginal"
          name="gloss"
          onChange={handleChange}
          defaultValue={defaults.gloss as string}
        />

        <Pill>description</Pill>
        <Input
          as="textarea"
          placeholder="A longer contextual text"
          name="description"
          onChange={handleChange}
          defaultValue={defaults.description as string}
        />

        <Button type="submit">{label}</Button>
      </Stack>
    </form>
  );
};
