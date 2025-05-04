import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { create } from 'xmlbuilder2';
import { dirname } from 'path';
import { fetchProducts } from './services.js';
import { fileURLToPath } from 'url';
import { generateProductId } from '../lib/productIdParser.ts';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://www.mybigshelf.com';

// Fetch static routes
const getStaticRoutes = () => [
  '/',
  '/about',
  '/tracker',
  '/checkout',
  '/partner',
];

// Fetch dynamic routes
const getDynamicRoutes = async () => {
  try {
    const products = await fetchProducts();
    return products?.map((product) => {
      const productId = generateProductId(product);
      console.log('Product-id:', productId);
      return `/?item-id=${productId}`; // Adjusted route format
    });
  } catch (error) {
    console.error('❌ Error fetching dynamic routes:', error);
    return [];
  }
};

// Generate XML sitemap
const generateXML = (routes) => {
  const urlset = create({ version: '1.0' }).ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  });

  routes.forEach((route) => {
    const url = urlset.ele('url');
    url.ele('loc').txt(baseUrl + route);
    url.ele('lastmod').txt(new Date().toISOString());
  });

  return urlset.end({ prettyPrint: true });
};

// Main function to generate sitemap
const generateSitemap = async () => {
  try {
    const staticRoutes = getStaticRoutes();
    const dynamicRoutes = await getDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    const xml = generateXML(allRoutes);

    const outputPath = resolve(__dirname, '../../public/sitemap.xml');
    writeFileSync(outputPath, xml);

    console.log(
      '✅ Sitemap generated successfully at:',
      outputPath,
      `for ${allRoutes.length} routes`
    );
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
};

await generateSitemap();
