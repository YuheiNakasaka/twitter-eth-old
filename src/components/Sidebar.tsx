import Link from "next/link";
import { Flex, Text, Icon, Spacer } from "@chakra-ui/react";
import { RiHome7Line, RiHome7Fill } from "react-icons/ri";
import { BsPerson, BsPersonFill, BsTwitter } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { FlatButton } from "components/FlatButton";

export const HeaderTabType = {
  Home: "home",
  Profile: "profile",
};

interface SideBarProps {
  account: string | null | undefined;
  type: string;
}

export const SideBar = ({ account, type }: SideBarProps) => {
  return (
    <Flex
      flexBasis={{
        base: "100%",
        xl: "20ch",
      }}
      flexGrow={1}
      flexDir={{
        base: "row",
        xl: "column",
      }}
      borderX={{
        base: "1px solid #eee",
        xl: "0",
      }}
      borderBottom={{
        base: "1px solid #eee",
        xl: "0",
      }}
    >
      <Flex
        p={{
          base: "1rem 1rem 1rem 1rem",
          xl: "1rem",
        }}
      >
        <Link href={`/`} passHref>
          <FlatButton>
            <Icon
              as={BsTwitter}
              mr="1rem"
              fontSize="2rem"
              fontWeight="bold"
              color="#1DA1F2"
            />
          </FlatButton>
        </Link>
      </Flex>
      <Link href={`/`} passHref>
        <FlatButton>
          <Flex
            p={{
              base: "1rem",
              xl: "1rem",
            }}
          >
            <Icon
              as={type == HeaderTabType.Home ? RiHome7Fill : RiHome7Line}
              mr="1rem"
              fontSize="2rem"
            />
            <Text
              fontSize="1.4rem"
              fontWeight={type == HeaderTabType.Home ? "bold" : "normal"}
              display={{
                base: "none",
                xl: "block",
              }}
            >
              Home
            </Text>
          </Flex>
        </FlatButton>
      </Link>
      {account && (
        <Link href={`/${account}`} passHref>
          <FlatButton>
            <Flex
              p={{
                base: "1rem",
                xl: "0 1rem 1rem 1rem",
              }}
            >
              <Icon
                as={type == HeaderTabType.Profile ? BsPersonFill : BsPerson}
                mr="1rem"
                fontSize="2rem"
              />
              <Text
                fontSize="1.4rem"
                fontWeight={type == HeaderTabType.Profile ? "bold" : "normal"}
                display={{
                  base: "none",
                  xl: "block",
                }}
              >
                Profile
              </Text>
            </Flex>
          </FlatButton>
        </Link>
      )}
      <Spacer />
      <FlatButton>
        <Flex
          p={{
            base: "1rem",
            xl: "0 1rem 1rem 1rem",
          }}
        >
          <Icon as={FaEthereum} mr="1rem" fontSize="1.5rem" />
          <Text
            fontSize="1rem"
            fontWeight={"normal"}
            display={{
              base: "none",
              xl: "block",
            }}
          >
            Ropsten
          </Text>
        </Flex>
      </FlatButton>
    </Flex>
  );
};
