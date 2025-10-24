import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { MainContainer } from '../../components/MainContainer';
import { PostCard } from '../../components/PostCard';
import { PostData } from '../../domain/posts/post';
import { Container } from './styles';

export type HomePageProps = {
  posts: PostData[];
};

export function HomePage({ posts }: HomePageProps) {
  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <>
      <Header />
      <MainContainer>
        <Container>
          {postsArray.map((post) => {
            // ✅ Cover é um ARRAY - acesse o primeiro item
            const coverUrl =
              post.cover?.[0]?.url ||
              post.cover?.[0]?.formats?.large?.url ||
              post.cover?.[0]?.formats?.medium?.url ||
              post.cover?.[0]?.formats?.small?.url ||
              post.cover?.[0]?.formats?.thumbnail?.url;

            console.log(`📄 ${post.title}:`, coverUrl);

            return (
              <PostCard key={post.slug} cover={coverUrl} slug={post.slug} title={post.title} />
            );
          })}
        </Container>
      </MainContainer>
      <Footer />
    </>
  );
}
