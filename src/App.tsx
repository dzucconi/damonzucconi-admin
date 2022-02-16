import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  Alerts,
  AlertsProvider,
  Box,
  GlobalStyles,
  Stack,
  Button,
  Plus,
  ThemerProvider,
  useThemer,
} from "@auspices/eos";
import {
  ArtworkIndexPage,
  ArtworkShowPage,
  ArtworkNewPage,
  LoginPage,
} from "./pages";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { UrqlProvider } from "./lib/urql";

const App = () => {
  const { theme } = useThemer();

  return (
    <ThemeProvider theme={theme}>
      <AlertsProvider>
        <Box
          display="flex"
          flexDirection="column"
          p={[0, 0, 2, 4]}
          minHeight="100vh"
        >
          <GlobalStyles />

          <Alerts
            position="fixed"
            bottom={4}
            right={4}
            width="20rem"
            zIndex={100}
          />

          <Switch>
            <Route path="/login" exact>
              <LoginPage />
            </Route>

            <ErrorBoundary>
              <Stack>
                <Stack
                  direction="horizontal"
                  position="sticky"
                  top={0}
                  zIndex={2}
                >
                  <Button as={Link} flex={1} to="/artwork/new">
                    <Plus size={4} strokeWidth="1px" mr={3} />
                    artwork
                  </Button>

                  <Button as={Link} flex={1} to="/artworks">
                    artworks
                  </Button>

                  <Button as={Link} flex={1} to="/exhibitions">
                    exhibitions
                  </Button>
                </Stack>

                <Switch>
                  <Route path="/artwork/new" exact>
                    <ArtworkNewPage />
                  </Route>

                  <Route path={["/", "/artworks"]} exact>
                    <ArtworkIndexPage />
                  </Route>

                  <Route path="/artwork/:id" exact>
                    <ArtworkShowPage />
                  </Route>
                </Switch>
              </Stack>
            </ErrorBoundary>
          </Switch>
        </Box>
      </AlertsProvider>
    </ThemeProvider>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <BrowserRouter>
      <UrqlProvider>
        <ThemerProvider>
          <Helmet
            defaultTitle="Loading / Damon Zucconi"
            titleTemplate="%s / Damon Zucconi"
          />

          <App />
        </ThemerProvider>
      </UrqlProvider>
    </BrowserRouter>
  );
};
