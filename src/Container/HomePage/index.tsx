import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { MainContainer } from '../../components/MainContainer';
import { PostCard } from '../../components/PostCard';
import { PostData } from '../../domain/posts/post';
import { Container } from './styles';

export type HomePageProps = {
  posts: PostData[];
  category?: string;
};

export function HomePage({ posts, category }: HomePageProps) {
  const postsArray = Array.isArray(posts) ? posts : [];

  // Filtra posts por categoria se for fornecida
  const filteredPosts = category
    ? postsArray.filter((post) => {
        const postCategory =
          typeof post.category === 'string' ? post.category : post.category?.name;
        return postCategory?.toLowerCase() === category.toLowerCase();
      })
    : postsArray;

  return (
    <>
      <Header />
      <MainContainer>
        <Container>
          {filteredPosts.length === 0 ? (
            <p>Nenhum post encontrado{category ? ` na categoria ${category}` : ''}.</p>
          ) : (
            filteredPosts.map((post) => {
              // ✅ Cover é um ARRAY - acesse o primeiro item
              const coverUrl =
                post.cover?.[0]?.url ||
                post.cover?.[0]?.formats?.large?.url ||
                post.cover?.[0]?.formats?.medium?.url ||
                post.cover?.[0]?.formats?.small?.url ||
                post.cover?.[0]?.formats?.thumbnail?.url;

              // ✅ Tratamento seguro para autor
              const authorName =
                typeof post.author === 'string'
                  ? post.author
                  : post.author?.name || 'Autor Desconhecido';

              console.log(`📄 ${post.title}:`, coverUrl);

              return (
                <PostCard
                  key={post.slug}
                  cover={coverUrl}
                  slug={post.slug}
                  title={post.title}
                  author={authorName} // ✅ Agora sempre será string
                  date={post.created_at}
                  category={typeof post.category === 'string' ? post.category : post.category?.name}
                />
              );
            })
          )}
        </Container>
      </MainContainer>
      <Footer />
    </>
  );
}
