import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { MainContainer } from '../../components/MainContainer';
import { PostContainer } from '../../components/PostContainer';
import { PostCover } from '../../components/PostCover';
import { PostDetails } from '../../components/PostDetails';
import { Comments } from '../../Comments';

import { PostData } from '../../domain/posts/post';
import { Container } from './styles';

export type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  const coverUrl =
    post.cover?.[0]?.url ||
    post.cover?.[0]?.formats?.large?.url ||
    post.cover?.[0]?.formats?.medium?.url ||
    post.cover?.[0]?.formats?.small?.url ||
    post.cover?.[0]?.formats?.thumbnail?.url;
  return (
    <>
      <Header />
      <MainContainer>
        <Heading>{post.title}</Heading>
        <PostCover coverUrl={coverUrl} alt={post.title} />
        <PostDetails
          author={post.author.name}
          category={post.category.name}
          date={post.created_at}
        />
        <PostContainer content={post.content} />
      </MainContainer>
      <Comments slug={post.slug} title={post.title} />
      <Footer />
    </>
  );
};
