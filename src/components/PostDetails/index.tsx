import { Date } from '../Date';
import { Container } from './styles';

export type PostDetailsProps = {
  author?: string | { name: string } | null;
  category?: string | { name: string } | null;
  date: string;
};

export const PostDetails = ({ author, category, date }: PostDetailsProps) => {
  // Tratamento mais robusto para autor
  const getAuthorName = () => {
    if (author === undefined || author === null) {
      return 'Autor desconhecido';
    }

    if (typeof author === 'string') {
      return author || 'Autor desconhecido';
    }

    return author?.name || 'Autor desconhecido';
  };

  // Tratamento mais robusto para categoria
  const getCategoryName = () => {
    if (category === undefined || category === null) {
      return 'Sem categoria';
    }

    if (typeof category === 'string') {
      return category || 'Sem categoria';
    }

    return category?.name || 'Sem categoria';
  };

  const authorName = getAuthorName();
  const categoryName = getCategoryName();

  return (
    <Container>
      Publicado em <Date date={date} /> por {authorName} | {categoryName}
    </Container>
  );
};
