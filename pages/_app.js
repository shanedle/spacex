import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  Container,
} from "@chakra-ui/react";

import NavBar from "../components/NavBar/NavBar";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql",
  cache: new InMemoryCache(),
});

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Container maxW="container.xl">
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <NavBar />
          <main>
            <Component {...pageProps} />
          </main>
        </Container>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
