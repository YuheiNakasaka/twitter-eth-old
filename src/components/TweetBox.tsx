import Link from "next/link";
import { Flex, Box, Text, Image, Icon } from "@chakra-ui/react";
import { FlatButton } from "components/FlatButton";
import { Tweet } from "models/tweet";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import { CircleAvatar } from "./CircleAvatar";
dayjs.extend(relativeTime);

export const HeaderTabType = {
  Home: "home",
  Profile: "profile",
};

interface TweetBoxProps {
  tweet: Tweet;
  myAddress: string;
  onClickLike?: () => Promise<boolean>;
  onClickRT?: () => Promise<boolean>;
  onClickComment?: () => Promise<boolean>;
}

export const TweetBox = ({
  tweet,
  myAddress,
  onClickLike,
  onClickRT,
  onClickComment,
}: TweetBoxProps) => {
  const [isLiked, setIsLiked] = useState(tweet.likes.includes(myAddress));
  const [likeCount, setLikeCount] = useState(tweet.likes.length);
  return (
    <Box
      key={tweet.timestamp}
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
        <Flex mb="1rem">
          {tweet.iconUrl != "" ? (
            <Link href={`/${tweet.author}`} passHref>
              <FlatButton>
                <CircleAvatar iconUrl={tweet.iconUrl} size="2.3rem" />
              </FlatButton>
            </Link>
          ) : (
            <Link href={`/${tweet.author}`} passHref>
              <FlatButton>
                <Icon as={BsPersonCircle} fontSize="2.3rem" />
              </FlatButton>
            </Link>
          )}
          <Link href={`/${tweet.author}`} passHref>
            <FlatButton>
              <Text fontSize="0.9rem" fontWeight="bold" ml="1rem" isTruncated>
                {tweet.author}
              </Text>
            </FlatButton>
          </Link>
          <FlatButton>
            <Text
              fontSize="0.9rem"
              fontWeight="normal"
              ml="0.5rem"
              color="rgb(83, 100, 113)"
              isTruncated
            >
              {dayjs(tweet.timestamp).fromNow()}
            </Text>
          </FlatButton>
        </Flex>
        <Text fontSize="1rem">{tweet.content}</Text>
        {tweet.attachment && (
          <Flex justifyContent="center" my="1rem">
            <Image
              src={tweet.attachment}
              alt="expected image"
              maxHeight="200px"
            />
          </Flex>
        )}
        <Flex justifyContent="end" mt="1rem">
          {onClickComment && (
            <Link href={`/${tweet.author}/tweets/${tweet.tokenId}`} passHref>
              <FlatButton onClick={() => {}}>
                <Flex>
                  <Icon
                    as={AiOutlineComment}
                    fontSize="1.4rem"
                    color={"rgb(83, 100, 113)"}
                    mr="1rem"
                  />
                </Flex>
              </FlatButton>
            </Link>
          )}
          {onClickLike && (
            <FlatButton
              onClick={() => {
                if (!isLiked) {
                  onClickLike()
                    .then((e) => {
                      if (e) {
                        setIsLiked(true);
                        setLikeCount(likeCount + 1);
                      }
                    })
                    .catch((e) => setIsLiked(false));
                }
              }}
            >
              <Flex>
                <Icon
                  as={isLiked ? AiFillHeart : AiOutlineHeart}
                  fontSize="1.4rem"
                  color={isLiked ? "rgb(249, 24, 128)" : "rgb(83, 100, 113)"}
                  mr="0.5rem"
                />
                <Text
                  fontSize="0.9rem"
                  color={isLiked ? "rgb(249, 24, 128)" : "rgb(83, 100, 113)"}
                >
                  {likeCount}
                </Text>
              </Flex>
            </FlatButton>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
