import React from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/react-hooks";
import { Button, Stack, Loading, Tag } from "@auspices/eos";
import { Link } from "react-router-dom";
import { ArtworkIndexPageQuery } from "../generated/types/ArtworkIndexPageQuery";

export const ARTWORK_INDEX_PAGE_QUERY = gql`
  query ArtworkIndexPageQuery {
    artworks {
      id
      state
      slug
      title
    }
  }
`;

const STATUS_COLORS = {
  draft: "danger",
  selected: "accent",
  published: "secondary",
  archived: "tertiary",
} as const;

export const ArtworkIndexPage: React.FC = () => {
  const { data, loading, error } = useQuery<ArtworkIndexPageQuery>(
    ARTWORK_INDEX_PAGE_QUERY
  );

  if (error) {
    throw error;
  }

  if (loading || !data) {
    return <Loading />;
  }

  const { artworks } = data;

  return (
    <>
      <Helmet>
        <title>Artworks</title>
      </Helmet>

      <Stack width="100%">
        {artworks.map((artwork) => {
          return (
            <Button
              as={Link}
              to={`/artwork/${artwork.slug}`}
              flex={8}
              justifyContent="flex-start"
              key={artwork.id}
            >
              {artwork.title}

              <Tag
                ml={4}
                bg={STATUS_COLORS[artwork.state as keyof typeof STATUS_COLORS]}
              >
                {artwork.state}
              </Tag>
            </Button>
          );
        })}
      </Stack>
    </>
  );
};
