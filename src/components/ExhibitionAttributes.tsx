import React from "react";
import { Input, Stack, Pill, Field, Button, Select } from "@auspices/eos";
import gql from "graphql-tag";
import {
  ExhibitionAttributesFragment,
  ExhibitionAttributes as Attributes,
  State,
  ExhibitionKind,
} from "../generated/graphql";
import { useForm } from "react-hook-form";

gql`
  fragment ExhibitionAttributesFragment on Exhibition {
    id
    slug
    state
    title
    city
    country
    description
    start_date
    end_date
    external_url
    kind
    venue
  }
`;

type ExhibitionAttributesProps = {
  defaults?: ExhibitionAttributesFragment;
  label?: string;
  onSubmit(attributes: Attributes): void;
};

export const ExhibitionAttributes: React.FC<ExhibitionAttributesProps> = ({
  label = "Add",
  defaults,
  onSubmit,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm<Attributes>({
    defaultValues: {
      state: defaults?.state ?? State.Draft,
      title: defaults?.title ?? "",
      city: defaults?.city ?? "",
      country: defaults?.country ?? "",
      description: defaults?.description ?? "",
      startDate: defaults?.start_date ?? "",
      endDate: defaults?.end_date ?? "",
      externalUrl: defaults?.external_url ?? "",
      kind: defaults?.kind ?? ExhibitionKind.Solo,
      venue: defaults?.venue ?? "",
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
          label="City"
          input={{
            ...register("city", { required: false }),
          }}
        />

        <Field
          label="Country"
          input={{
            ...register("country", { required: false }),
          }}
        />

        <Field
          label="Venue"
          input={{
            ...register("venue", { required: false }),
          }}
        />

        <Field
          label="External URL"
          input={{
            type: "url",
            placeholder: "https://",
            ...register("externalUrl", { required: false }),
          }}
        />

        <Field
          label="Start date"
          input={{
            type: "date",
            ...register("startDate", { required: false }),
          }}
        />

        <Field
          label="End date"
          input={{
            type: "date",
            ...register("endDate", { required: false }),
          }}
        />

        <Pill>Description</Pill>
        <Input
          as="textarea"
          placeholder="A longer contextual text"
          rows={7}
          {...register("description")}
        />

        <Button type="submit">{label}</Button>
      </Stack>
    </form>
  );
};
