import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useEthers } from "@usedapp/core";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { User } from "models/user";
import { SideBar, HeaderTabType } from "components/Sidebar";
import { utils, Contract } from "ethers";
import ABI from "resources/twitter-abi.json";
import { FlatButton } from "components/FlatButton";
import { useRouter } from "next/router";

const MainContent = () => {
  const router = useRouter();
  const uid = router.query.uid?.toString() || "";
  const { account, library } = useEthers();
  const [followings, setFollowings] = useState<User[]>([]);
  const [fetching, setFetching] = useState(false);

  const getFollowings = async (address: string): Promise<User[]> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi);
      const contract = new Contract(
        `${process.env.NEXT_PUBLIC_TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      );
      const followings = await contract.getFollowings(address);
      return followings;
    } else {
      console.log("Library is undefined");
      return [];
    }
  };

  useEffect(() => {
    if (library !== undefined && uid !== "") {
      setFetching(true);
      getFollowings(uid)
        .then((followings) => {
          setFollowings(followings);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [library]);

  return (
    <>
      <Box w="100vw" minH="100vh">
        <Flex
          flexWrap="wrap"
          maxW={{
            base: "100vw",
            lg: "60vw",
            xl: "60vw",
          }}
          m="0 auto"
        >
          <SideBar type={HeaderTabType.Profile} account={account} />
          <Flex
            flexBasis={0}
            flexGrow={999}
            flexDir="column"
            minH="100vh"
            borderX="1px solid #eee"
          >
            <Box borderBottom="1px solid #eee">
              <Box w="100%" px="1rem" p="1rem">
                <Text fontSize="1.4rem" fontWeight="bold">
                  Followings
                </Text>
                <Text fontSize="0.5rem" isTruncated>
                  {uid}
                </Text>
              </Box>
            </Box>
            <Box>
              {fetching ? (
                <Box textAlign="center" p="1rem">
                  <Spinner color="#1DA1F2" size="lg" />
                </Box>
              ) : (
                followings.map((user: User) => (
                  <Box
                    key={user.id}
                    w={{
                      base: "100vw",
                      sm: "100%",
                      md: "100%",
                      lg: "100%",
                      xl: "100%",
                    }}
                    borderBottom="1px solid #eee"
                  >
                    <Box p="1rem">
                      <Flex mb="0.2rem">
                        <Link
                          href={`/playgrounds/twitter_eth/${user.id}`}
                          passHref
                        >
                          <FlatButton>
                            <Text
                              fontSize="0.9rem"
                              fontWeight="bold"
                              isTruncated
                            >
                              {user.id}
                            </Text>
                          </FlatButton>
                        </Link>
                      </Flex>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

const Followings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter ETH</title>
      </Head>
      <MainContent />
    </>
  );
};

export default Followings;
