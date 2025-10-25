import { Container } from './styled';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export type CommentsProps = {
  slug: string;
  title: string;
};

export const Comments = ({ slug, title }: CommentsProps) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!commentsRef.current) return;

    console.log('🔄 Comments useEffect - Slug:', slug, 'Title:', title, 'Pathname:', router.asPath);

    // Remove qualquer script anterior
    commentsRef.current.innerHTML = '';

    // Configura o Utterances
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'MarcelobigBird/blog_next');
    script.setAttribute('issue-term', 'pathname'); // Usando pathname em vez de title
    script.setAttribute('label', 'comentarios');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    script.onload = () => {
      console.log('✅ Utterances carregado com sucesso!');
    };

    script.onerror = (error) => {
      console.error('❌ Erro ao carregar o Utterances:', error);
    };

    commentsRef.current.appendChild(script);
  }, [slug, title, router.asPath]); // Adicionei router.asPath como dependência

  return (
    <Container>
      <div ref={commentsRef} />
    </Container>
  );
};
