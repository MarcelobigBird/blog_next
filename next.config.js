/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remova output: 'export' se estiver presente, pois você precisa de um servidor
  trailingSlash: true,
  // Se você está usando imagens de um domínio externo, configure-o aqui
  images: {
    unoptimized: true, // Se você não quer que o Next.js otimize imagens, pois em static export não funciona sem isso
    domains: ['res.cloudinary.com'], // Adicione os domínios de onde você carrega imagens
  },
  // Se você tem rotas API, não use output: 'export'
};

module.exports = nextConfig;
