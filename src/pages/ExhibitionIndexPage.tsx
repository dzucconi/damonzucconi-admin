import React from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { Button, Loading, Tag, Cell, Box } from "@auspices/eos";
import { useExhibitionIndexPageQuery } from "../generated/graphql";
import { Table } from "../components/Table";

gql`
  query ExhibitionIndexPageQuery {
    exhibitions {
      id
      slug
      title
      state
      kind
      year: start_date(format: "%Y")
      images {
        __typename
      }
    }
  }
`;

export const ExhibitionIndexPage: React.FC = () => {
  const [{ data, fetching, error }] = useExhibitionIndexPageQuery();

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const { exhibitions } = data;

  return (
    <>
      <Helmet>
        <title>Exhibitions</title>
      </Helmet>

      <Table>
        <thead>
          <tr>
            <th>
              <Cell borderWidth={0} justifyContent="center">
                Title
              </Cell>
            </th>

            <th>
              <Cell borderWidth={0} justifyContent="center">
                State
              </Cell>
            </th>

            <th>
              <Cell borderWidth={0} justifyContent="center">
                Kind
              </Cell>
            </th>

            <th>
              <Cell borderWidth={0} justifyContent="center">
                Images
              </Cell>
            </th>

            <th>
              <Cell borderWidth={0} justifyContent="center">
                Year
              </Cell>
            </th>
          </tr>
        </thead>

        <tbody>
          {exhibitions.map((exhibition) => {
            return (
              <tr key={exhibition.id}>
                <td>
                  <Button
                    as="a"
                    href={`/exhibitions/${exhibition.slug}`}
                    borderWidth={0}
                    width="100%"
                  >
                    {exhibition.title}
                  </Button>
                </td>

                <td>
                  <Box mx={6} textAlign="center" lineHeight={0}>
                    <Tag>{exhibition.state}</Tag>
                  </Box>
                </td>

                <td>
                  <Box mx={6} textAlign="center" lineHeight={0}>
                    <Tag>{exhibition.kind}</Tag>
                  </Box>
                </td>

                <td>
                  <Cell borderWidth={0} justifyContent="center">
                    {exhibition.images.length}
                  </Cell>
                </td>

                <td>
                  <Cell borderWidth={0} justifyContent="center">
                    {exhibition.year}
                  </Cell>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
