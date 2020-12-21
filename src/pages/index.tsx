import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Button, Stack, Box, Heading, Text, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <Flex justify="flex-end">
        <NextLink href="/create-post">
          <Button colorScheme="teal" variant="solid">
            Create Post
          </Button>
        </NextLink>
      </Flex>

      {!data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} mt={4}>
          {data.posts.map((post) => (
            <Box key={post.id} p={4} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
