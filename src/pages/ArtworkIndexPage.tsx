import React, { useState } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import {
  Button,
  Loading,
  Tag,
  Cell,
  Box,
  Image,
  EmptyFrame,
  Tooltip,
  ResponsiveImage,
  ClearableInput,
  Stack,
  PaneOption,
  ContextMenu,
} from "@auspices/eos";
import {
  OrderableAction,
  useArtworkIndexPageQuery,
  useReorderArtworkMutation,
} from "../generated/graphql";
import { Table } from "../components/Table";
import { useKeyboardListNavigation } from "use-keyboard-list-navigation";
import { useHistory } from "react-router";

export const ArtworkIndexPage: React.FC = () => {
  const [{ data, fetching, error }] = useArtworkIndexPageQuery();

  const history = useHistory();

  const [query, setQuery] = useState("");

  const filtered =
    !fetching && data && query !== ""
      ? data.artworks.filter((artwork) => {
          return artwork.title.toLowerCase().includes(query.toLowerCase());
        })
      : [];

  const { index } = useKeyboardListNavigation({
    list: filtered,
    onEnter: ({ element }) => {
      if (!element) return;
      history.push(`/artworks/${element.slug}`);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, reorderArtwork] = useReorderArtworkMutation();

  const handleReorder = (id: string, action: OrderableAction) => {
    reorderArtwork({ id, action });
  };

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const { artworks } = data;

  const hasNoResults = query === "" && filtered.length === 0;
  const results = hasNoResults ? artworks : filtered.slice(0, 15);

  return (
    <>
      <Helmet>
        <title>Artworks</title>
      </Helmet>

      <Stack>
        <ClearableInput placeholder="Search" onChange={setQuery} />

        <Table>
          <thead>
            <tr>
              <th>
                <Cell borderWidth={0}>Preview</Cell>
              </th>

              <th>
                <Cell borderWidth={0} justifyContent="center">
                  Title
                </Cell>
              </th>

              <th>
                <Cell borderWidth={0}>Material</Cell>
              </th>

              <th>
                <Cell borderWidth={0} justifyContent="center">
                  State
                </Cell>
              </th>

              <th>
                <Cell borderWidth={0} justifyContent="center">
                  Year
                </Cell>
              </th>

              <th>
                <Cell borderWidth={0} justifyContent="center">
                  Actions
                </Cell>
              </th>
            </tr>
          </thead>

          <tbody>
            {results.map((artwork, i) => {
              const [image] = artwork.images;

              return (
                <tr key={artwork.id}>
                  <td>
                    {image ? (
                      <Tooltip
                        label={
                          <Box
                            width={image.preview.width}
                            height={image.preview.height}
                            my={4}
                            mx={3}
                          >
                            <ResponsiveImage
                              display="block"
                              m="auto"
                              srcs={[
                                image.preview.urls._1x,
                                image.preview.urls._2x,
                              ]}
                              aspectWidth={image.preview.width}
                              aspectHeight={image.preview.height}
                              alt={image.title ?? ""}
                              loading="lazy"
                              indicator
                            />
                          </Box>
                        }
                      >
                        <Image
                          display="block"
                          m="auto"
                          srcs={[image.thumb.urls._1x, image.thumb.urls._2x]}
                          width={image.thumb.width}
                          height={image.thumb.height}
                          alt={image.title ?? ""}
                          loading="lazy"
                        />
                      </Tooltip>
                    ) : (
                      <EmptyFrame
                        m="auto"
                        width={25}
                        height={25}
                        color="tertiary"
                        border="1px solid"
                        borderColor="tertiary"
                      />
                    )}
                  </td>

                  <td>
                    <Button
                      as="a"
                      href={`/artworks/${artwork.slug}`}
                      borderWidth={0}
                      width="100%"
                      highlighted={!hasNoResults && index === i}
                    >
                      {artwork.title}
                    </Button>
                  </td>

                  <td>
                    <Cell borderWidth={0}>{artwork.material}</Cell>
                  </td>

                  <td>
                    <Box mx={6} textAlign="center" lineHeight={0}>
                      <Tag>{artwork.state}</Tag>
                    </Box>
                  </td>

                  <td>
                    <Cell borderWidth={0}>{artwork.year}</Cell>
                  </td>

                  <td>
                    <ContextMenu display="flex" justifyContent="center">
                      <PaneOption
                        onClick={() => {
                          handleReorder(artwork.id, OrderableAction.MoveToTop);
                        }}
                      >
                        Move to top
                      </PaneOption>

                      <PaneOption
                        onClick={() => {
                          handleReorder(
                            artwork.id,
                            OrderableAction.MoveToBottom
                          );
                        }}
                      >
                        Move to bottom
                      </PaneOption>

                      <PaneOption
                        onClick={() => {
                          handleReorder(artwork.id, OrderableAction.MoveUp);
                        }}
                      >
                        Move up
                      </PaneOption>

                      <PaneOption
                        onClick={() => {
                          handleReorder(artwork.id, OrderableAction.MoveDown);
                        }}
                      >
                        Move down
                      </PaneOption>
                    </ContextMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Stack>
    </>
  );
};

gql`
  fragment ArtworkIndexPageFragment on Query {
    artworks {
      id
      state
      slug
      title
      material
      year
      images(limit: 1) {
        title
        thumb: resized(width: 25, height: 25) {
          width
          height
          urls {
            _1x
            _2x
          }
        }
        preview: resized(width: 500, height: 500) {
          width
          height
          urls {
            _1x
            _2x
          }
        }
      }
    }
  }

  query ArtworkIndexPageQuery {
    ...ArtworkIndexPageFragment
  }
`;

gql`
  mutation ReorderArtwork($id: ID!, $action: OrderableAction!) {
    reorder_artwork(input: { id: $id, action: $action }) {
      query {
        ...ArtworkIndexPageFragment
      }
    }
  }
`;
