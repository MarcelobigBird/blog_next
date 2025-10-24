import { Date } from '../Date';
import { Container } from './styles';

export type PostDetailsProps = {
  date: string;
  author: string | { name: string }; // Aceita string ou objeto com name
  category: string | { name: string }; // Aceita string ou objeto com name
};

export const PostDetails = ({ author, category, date }: PostDetailsProps) => {
  return (
    <Container>
      Publicado por <strong>{typeof author === 'string' ? author : author?.name}</strong> em{' '}
      <strong>{typeof category === 'string' ? category : category?.name}</strong> em{' '}
      <Date date={date} />
    </Container>
  );
};
