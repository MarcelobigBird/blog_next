import { HomePage } from '../Container/HomePage';

import { getAllPosts } from '../data/posts/get-all-posts';
import { getPost } from '../data/posts/getPost';
import { PostData } from '../domain/posts/post';
import { GetStaticProps } from 'next';

export type HomeProps = {
  posts: PostData[];
};

export default function Home({ posts }: HomeProps) {
  return <HomePage posts={posts} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getAllPosts();
  // '&sort=id:desc&pagination[start]=0&pagination[limit]=1'
  return {
    props: { posts },
    // revalidate: 5,
  };
};
