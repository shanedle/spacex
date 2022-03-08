import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react";

const LaunchList = ({ launches }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="25px">
      {launches.map((launch) => (
        <Link key={launch.id} href={`/launch/${launch.id}`}>
          <Center py={6}>
            <Box
              maxW={"445px"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"md"}
              p={6}
              overflow={"hidden"}
              cursor="pointer"
            >
              <Box h={"210px"} mt={-6} mx={-6} mb={6} pos={"relative"}>
                <Image
                  src={launch.links.flickr_images[0]}
                  objectFit="cover"
                  layout={"fill"}
                  alt={launch.mission_name}
                />
              </Box>
              <Stack>
                <Heading
                  fontSize={"2xl"}
                  fontFamily={"body"}
                  align="center"
                  justify="center"
                >
                  {launch.mission_name.slice(0, 20)}
                </Heading>
                <Text>{launch.details?.slice(0, 75)}...</Text>
              </Stack>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                <Avatar src={launch.links.mission_patch} alt={"Author"} />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>
                    {launch.launch_site.site_name_long.slice(0, 45)}...
                  </Text>
                  <Text>
                    {new Date(launch.launch_date_local).toLocaleDateString(
                      "no-NO",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default LaunchList;
