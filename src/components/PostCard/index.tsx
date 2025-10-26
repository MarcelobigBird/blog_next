import Link from 'next/link';
import { Container, PostCardCover, PostCardHeading } from './styles';

export type PostCardProps = {
  cover?: string;
  slug: string;
  title: string;
  author: string; // ← deve ser string
  date: string;
  category?: string;
};
export const PostCard = ({ slug, title, cover }: PostCardProps) => {
  return (
    <Container>
      <PostCardCover>
        <Link href="/post/[slug]" as={`/post/${slug}`}>
          <img src={cover} alt={title} />
        </Link>
      </PostCardCover>
      <PostCardHeading>
        <Link href="/post/[slug]" as={`/post/${slug}`}>
          {title}
        </Link>
      </PostCardHeading>
    </Container>
  );
};
