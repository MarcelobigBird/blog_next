import { ONEPOST_URL } from '../../config/app-config';

export const countAllPosts = async (): Promise<number> => {
  const response = await fetch(ONEPOST_URL);
  const data = await response.json();
  const total = data.meta?.pagination?.total || 0;
  console.log('Total de posts:', total); // Adicione esta linha
  return total;
};
