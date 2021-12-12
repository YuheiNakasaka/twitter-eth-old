import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter ETH</title>
        <meta name="description" content="Twitter ETH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Text>Hello Wordl!</Text>
      </Flex>
    </div>
  );
};

export default Home;
