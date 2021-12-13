import Link from "next/link";
import { Flex, Box, Text, Image, Icon } from "@chakra-ui/react";
import { FlatButton } from "components/FlatButton";
import { Tweet } from "models/tweet";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { useState } from "react";
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
}

export const TweetBox = ({
  tweet,
  myAddress,
  onClickLike,
  onClickRT,
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
        <Flex mb="0.2rem">
          <Link href={`/${tweet.author}`} passHref>
            <FlatButton>
              <Text fontSize="0.9rem" fontWeight="bold" isTruncated>
                {tweet.author}
              </Text>
            </FlatButton>
          </Link>
          <Text
            fontSize="0.9rem"
            ml="0.5rem"
            color="rgb(83, 100, 113)"
            isTruncated
          >
            {dayjs(tweet.timestamp).fromNow()}
          </Text>
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
        <Flex justifyContent="center" mt="1rem">
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
