export interface Tweet {
  tokenId: number;
  content: string;
  author: string;
  timestamp: number;
  attachment: string;
  likes: number[]; // array of user addresses
}
