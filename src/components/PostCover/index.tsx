import { Container } from './styles';

export type PostCoverProps = {
  coverUrl: string;
  alt: string;
};

export const PostCover = ({ coverUrl, alt }: PostCoverProps) => {
  console.log('PostCover - coverUrl:', coverUrl);
  if (!coverUrl) {
    return null;
  }

  return (
    <Container>
      <img src={coverUrl} alt={alt} />
    </Container>
  );
};
