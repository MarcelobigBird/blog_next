
import { PostData } from '../../domain/posts/post';
import { fetchJson } from '../../utils/fetch-json';
import { markdownToHtml } from '../../utils/markdown-to-html';
import { API_URL } from '../../config/app-config';

interface StrapiPostResponse {
  id: number;
  title: string;
  content: string;
  slug: string;
  author: any;
  category: any;
  cover: any;
  createdAt?: string; // Strapi pode retornar camelCase
  updatedAt?: string; // Strapi pode retornar camelCase
  created_at?: string; // Ou pode retornar snake_case
  updated_at?: string; // Ou pode retornar snake_case
  publishedAt: string;
  created_by?: any;
  updated_by?: any;
}


export type StrapiResponse = {
  data: StrapiPostResponse[];
  meta: any;
}

export const getPost = async (slug: string): Promise<PostData[]> => {
  const query = `filters[slug][$eq]=${slug}&populate[0]=cover&populate[1]=author&populate[2]=category`;
  const url = `${API_URL}?${query}`;

  const dataMarkdown = await fetchJson<StrapiResponse>(url);

  // ✅ Verifique se existem dados
  if (!dataMarkdown.data || dataMarkdown.data.length === 0) {
    return [];
  }

  const postData = dataMarkdown.data[0];
  console.log(postData)
  const content = await markdownToHtml(postData.content);

  // ✅ Garanta que created_at sempre tenha um valor
  const finalContent: PostData = {
    ...postData,
    content,
    created_at: postData.createdAt || postData.created_at || new Date().toISOString(), // Fallback
    updated_at: postData.updatedAt || postData.updated_at || new Date().toISOString(), // Fallback
    created_by: postData.created_by || { id: 0, firstname: '', lastname: '', username: null },
    updated_by: postData.updated_by || { id: 0, firstname: '', lastname: '', username: null }
  };

  return [finalContent];
};
