import Head from 'next/head';
import { Comments } from '../../Comments';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { MainContainer } from '../../components/MainContainer';
import { PostContainer } from '../../components/PostContainer';
import { PostCover } from '../../components/PostCover';
import { PostDetails } from '../../components/PostDetails';
import { PostData } from '../../domain/posts/post';

export type HeadProps = {
  title: string;
  slug: string;
  cover: any;
  post: PostData;
};

export const Post = ({ post }: HeadProps) => {
  const getCoverUrl = () => {
    if (!post.cover) {
      return null;
    }

    // Se for uma string, retorna a string
    if (typeof post.cover === 'string') {
      return post.cover;
    }

    if (Array.isArray(post.cover)) {
      if (post.cover.length === 0) {
        return null;
      }

      const firstCover = post.cover[0];
      return (
        firstCover.url ||
        firstCover.formats?.large?.url ||
        firstCover.formats?.medium?.url ||
        firstCover.formats?.small?.url ||
        firstCover.formats?.thumbnail?.url
      );
    }

    if (typeof post.cover === 'object') {
      return (
        post.cover.url ||
        post.cover.formats?.large?.url ||
        post.cover.formats?.medium?.url ||
        post.cover.formats?.small?.url ||
        post.cover.formats?.thumbnail?.url
      );
    }

    return null;
  };

  const coverUrl = getCoverUrl();

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content?.substring(0, 160) || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content?.substring(0, 160) || ''} />
        {coverUrl && <meta property="og:image" content={coverUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.content?.substring(0, 160) || ''} />
        {coverUrl && <meta name="twitter:image" content={coverUrl} />}
      </Head>
      <Header />
      <MainContainer>
        <Heading>{post.title}</Heading>
        <PostCover coverUrl={coverUrl} alt={post.title} />
        <PostDetails
          author={post?.author?.name}
          category={post?.category?.name}
          date={post.created_at}
        />
        <PostContainer content={post.content} />
      </MainContainer>
      <Comments slug={post.slug} title={post.title} />
      <Footer />
    </>
  );
};
