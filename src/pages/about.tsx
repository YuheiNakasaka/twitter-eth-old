import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter ETH - About</title>
        <meta name="description" content="Twitter ETH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Text>About!</Text>
        <Link href="/">⇨Back</Link>
      </Flex>
    </div>
  );
};

export default About;
