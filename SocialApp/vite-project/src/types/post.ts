export type PostUser = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type PostComment = {
  _id: string;
  content: string;
  image?: string | null;
  commentCreator: PostUser;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
};

export type SharedPost = {
  _id: string;
  id: string;
  body?: string;
  image?: string | null;
  privacy: string;
  user: PostUser;
  sharedPost: SharedPost | null;
  createdAt: string;
  updatedAt?: string;
  likes: string[];
  commentsCount: number;
  topComment: PostComment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
};

export type Post = SharedPost & {
  bookmarked: boolean;
};

export type PostsPagination = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number | null;
  total: number;
};

export type PostsResponse = {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
  meta: {
    pagination: PostsPagination;
  };
};
