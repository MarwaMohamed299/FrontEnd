export type PostUser = {
  _id: string;
  name: string;
  username?: string;
  photo?: string;
};

export type Post = {
  _id: string;
  body?: string;
  image?: string | null;
  user: PostUser;
  createdAt: string;
  updatedAt?: string;
  likes?: string[];
  commentsCount?: number;
};

export type PostsResponse = {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
};
