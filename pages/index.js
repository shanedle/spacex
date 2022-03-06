import Head from "next/head";
import { useQuery } from "@apollo/client";
import { Spinner, Flex, Heading, Box } from "@chakra-ui/react";

import LaunchList from "../components/Launches/LaunchList";

import { GET_LAUNCHES_QUERY } from "../graphql/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_LAUNCHES_QUERY);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return "Something went wrong!";
  }

  const launches = data.launchesPast.filter(
    (launch) => launch.links.flickr_images.length > 0
  );

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>SpaceX</title>
        <meta name="description" content="SpaceX launches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mb={4} flexDirection="column" py={8}>
        <Heading as="h1" size="2xl" align="center" justify="center" mb={8}>
          Launches
        </Heading>
        <LaunchList launches={launches} />
      </Box>
    </Flex>
  );
}
