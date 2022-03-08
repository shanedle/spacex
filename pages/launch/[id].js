import { useRouter } from "next/router";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { useQuery } from "@apollo/client";
import {
  Spinner,
  Flex,
  Heading,
  Stack,
  Button,
  Text,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { LinkIcon, ViewIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GET_ROCKET_INFO } from "../../queries";

const LaunchPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_ROCKET_INFO);
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

  const launchDetails = data.launchesPast.filter((launch) => launch.id === id);

  return (
    <>
      <NextSeo
        title={`SpaceX | ${launchDetails[0].rocket.rocket_name}`}
        description="SpaceX Website."
        canonical="https://spacex-shanedle.vercel.app/"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://spacex-shanedle.vercel.app/",
          site_name: `SpaceX | ${launchDetails[0].rocket.rocket_name}`,
          description: "SpaceX Website.",
        }}
      />

      <Breadcrumb
        fontWeight="medium"
        fontSize="xl"
        spacing="8px"
        pb={6}
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{launchDetails[0].rocket.rocket_name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Stack
        minH={"100vh"}
        maxH={"100vh"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex flex={1}>
          <Image
            src={launchDetails[0].links.flickr_images[0]}
            alt={launchDetails[0].rocket.rocket_name}
            objectFit={"cover"}
          />
        </Flex>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                color={"blue.500"}
                _after={{
                  content: "''",
                  width: "full",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.500",
                  zIndex: -1,
                }}
              >
                {launchDetails[0].mission_name}
              </Text>
              <br />
              <Text color={"blue.500"} as={"span"}>
                Name: {launchDetails[0].rocket.rocket_name}
              </Text>
              <br />
              <Text color={"blue.500"} as={"span"}>
                Type: {launchDetails[0].rocket.rocket_type}
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }}>
              {launchDetails[0].rocket.rocket.description}
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              {launchDetails[0].links.video_link && (
                <Button
                  as="a"
                  target="_blank"
                  href={launchDetails[0].links.video_link}
                  rounded={"full"}
                  bg={"blue.400"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  spacing="40px"
                  leftIcon={<ViewIcon w={6} h={6} />}
                >
                  Youtube
                </Button>
              )}
              {launchDetails[0].links.article_link && (
                <Button
                  as="a"
                  target="_blank"
                  href={launchDetails[0].links.article_link}
                  rounded={"full"}
                  leftIcon={<LinkIcon w={6} h={6} color="blue.500" />}
                >
                  Article
                </Button>
              )}
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};

export default LaunchPage;
