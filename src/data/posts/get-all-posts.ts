import { POST_URL } from '../../config/app-config';
import { PostData } from '../../domain/posts/post';
import { fetchJson } from '../../utils/fetch-json';

interface StrapiResponse {
  data: PostData[];
  meta?: any;
}
export const getAllPosts = async (query = ''): Promise<PostData[]> => {
  const url = query ? `${POST_URL}&${query}` : POST_URL;

  const responseData = await fetchJson<StrapiResponse>(url);

  // Retorna data.data para Strapi v5
  return responseData.data || [];
};
