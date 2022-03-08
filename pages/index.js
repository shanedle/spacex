import { NextSeo } from "next-seo";
import { useQuery } from "@apollo/client";
import { Spinner, Flex, Heading, Box } from "@chakra-ui/react";
import { GET_LAUNCHES_QUERY } from "../queries";
import LaunchList from "../components/Launches/LaunchList";

export default function Home() {
  const { loading, error, data } = useQuery(GET_LAUNCHES_QUERY);
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        className="spinner"
      />
    );
  }
  if (error) {
    return "Something went wrong!";
  }

  const launches = data.launchesPast.filter(
    (launch) => launch.links.flickr_images.length > 0
  );

  return (
    <>
      <NextSeo
        title="SpaceX | Home"
        description="SpaceX Website."
        canonical="https://spacex-shanedle.vercel.app/"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://spacex-shanedle.vercel.app/",
          site_name: "SpaceX | Home",
          description: "SpaceX Website.",
        }}
      />

      <Flex direction="column" justify="center" align="center">
        <Box mb={4} flexDirection="column" py={8}>
          <Heading as="h1" size="2xl" align="center" justify="center" mb={8}>
            Launches
          </Heading>
          <LaunchList launches={launches} />
        </Box>
      </Flex>
    </>
  );
}
