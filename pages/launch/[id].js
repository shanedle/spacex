import { useRouter } from "next/router";
import { GET_ROCKET_INFO } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

import {
  Spinner,
  Flex,
  Heading,
  Stack,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { LinkIcon, ViewIcon } from "@chakra-ui/icons";

const LaunchPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_ROCKET_INFO);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return "Something went wrong!";
  }

  const launchDetails = data.launchesPast.filter((launch) => launch.id === id);

  return (
    <>
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
                _after={{
                  content: "''",
                  width: "full",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                {launchDetails[0].mission_name}
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                Name: {launchDetails[0].rocket.rocket_name}
              </Text>{" "}
              <br />
              <Text color={"blue.400"} as={"span"}>
                Type: {launchDetails[0].rocket.rocket_type}
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
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
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  spacing="40px"
                  leftIcon={<ViewIcon w={6} h={6} color="gray.200" />}
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
                  leftIcon={<LinkIcon w={6} h={6} color="blue.400" />}
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
