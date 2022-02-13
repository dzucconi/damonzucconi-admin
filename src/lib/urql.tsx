import React, { FC } from "react";
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  makeOperation,
  Operation,
} from "urql";
import { authExchange } from "@urql/exchange-auth";

export const GRAPHQL_ENDPOINT = "https://api.damonzucconi.com/graph";
// export const GRAPHQL_ENDPOINT = "http://localhost:5001/graph";

export const client = createClient({
  url: GRAPHQL_ENDPOINT,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth: async ({ authState }) => {
        if (!authState) {
          const token = localStorage.getItem("token");
          if (token) return { token };
          return null;
        }
        return null;
      },
      addAuthToOperation: ({
        authState,
        operation,
      }: {
        authState: { token: string };
        operation: Operation<any, any>;
      }) => {
        if (!authState || !authState.token) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Basic ${authState.token}`,
            },
          },
        });
      },
    }),
    fetchExchange,
  ],
});

export const UrqlProvider: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
