import { GetStaticPaths, GetStaticProps } from 'next';
import { countAllPosts } from '../../data/posts/count-all-posts';
import { getAllPosts } from '../../data/posts/get-all-posts';
import { PostData } from '../../domain/posts/post';
import { Post } from '../../Container/Post';
import { getPost } from '../../data/posts/getPost';

export type DynamicPostProps = {
  post: PostData;
};

const DynamicPost = ({ post }: DynamicPostProps) => {
  return (
    <Post
      title={post.title}
      slug={post.slug}
      cover={post.cover} // Note: a função getCoverUrl dentro do Post pode precisar de uma string, mas post.cover pode ser um objeto ou array. Talvez seja melhor passar a string da URL ou ajustar o componente Post para receber o cover no formato que ele espera.
      post={post}
    />
  );
};

export default DynamicPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPosts = await countAllPosts();
  const posts = await getAllPosts(`pagination[limit]=${numberOfPosts}`);

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
