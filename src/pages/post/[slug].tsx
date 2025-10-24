import { GetStaticPaths, GetStaticProps } from 'next';
import { countAllPosts } from '../../data/posts/count-all-posts'; // Mudança aqui
import { getAllPosts } from '../../data/posts/get-all-posts'; // Mudança aqui
import { PostData } from '../../domain/posts/post';

import { Post } from '../../Container/Post';
import { getPost } from '../../data/posts/getPost';

export type DynamicPostProps = {
  post: PostData;
};

const DynamicPost = ({ post }: DynamicPostProps) => {
  return <Post post={post} />;
};

export default DynamicPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPosts = await countAllPosts();
  const posts = await getAllPosts(`pagination[limit]=${numberOfPosts}`); // Mudança aqui

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;

  if (!slug || typeof slug !== 'string') {
    return { notFound: true };
  }

  const posts = await getPost(slug);

  if (!posts || posts.length === 0) {
    return { notFound: true };
  }

  return {
    props: { post: posts[0] },
  };
};
