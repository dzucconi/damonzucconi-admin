import React from "react";
import { Helmet } from "react-helmet";
import { Pill, Stack } from "@auspices/eos";
import { Redirect } from "react-router-dom";

const isDevelopment = process.env.NODE_ENV === "development";

export type GraphQLError = {
  message: string;
  path: string[];
  locations: [
    {
      line: number;
      column: number;
    }
  ];
  extensions: {
    code?: string;
  };
};

export type ErrorFallbackProps = {
  error: Error & { graphQLErrors?: GraphQLError[] };
  componentStack: string;
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  componentStack,
  error,
}) => {
  const errorStack = (error.stack || componentStack)
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  const stackTrace = [
    error.graphQLErrors && JSON.stringify(error.graphQLErrors, null, 2),
    errorStack,
  ]
    .filter(Boolean)
    .join("\n\n");

  const requireLogin =
    error.graphQLErrors?.some(
      (err) => err.extensions.code === "UNAUTHORIZED"
    ) || error.message.includes("Unauthenticated");

  return (
    <>
      <Helmet>
        <title>error</title>
      </Helmet>

      {requireLogin && <Redirect to="/login" />}

      <Stack>
        {error && (
          <Pill as="h1" color="danger" borderColor="danger">
            {error.message}
          </Pill>
        )}

        {isDevelopment && (
          <Pill
            as="pre"
            fontFamily="mono"
            fontSize={0}
            color="white"
            backgroundColor="danger"
            borderColor="danger"
          >
            {stackTrace}
          </Pill>
        )}
      </Stack>
    </>
  );
};
