import { GetServerSideProps } from 'next';
import { getAllPosts } from '../../data/posts/get-all-posts';
import { PostData } from '../../domain/posts/post';
import { HomePage } from '../../Container/HomePage';

export type CategoryProps = {
  posts: PostData[];
  category: string;
};

export default function Category({ posts, category }: CategoryProps) {
  return <HomePage category={category} posts={posts} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const qs = require('qs');
  const query = qs.stringify(
    {
      sort: ['id:desc'],
      pagination: {
        start: 0,
        limit: 30,
      },
      filters: {
        category: {
          name: {
            $containsi: ctx.query.category,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const posts = await getAllPosts(query);

  return {
    props: { posts, category: ctx.query.category },
  };
};
