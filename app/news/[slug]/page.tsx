import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  date: string;
  title: string;
  slug: string;
  content: string;
}

// Sample news data with content
const newsItems: NewsItem[] = [
  {
    id: '1',
    date: 'March 23, 2025',
    title: 'Hyprland 0.48.0 is now available!',
    slug: 'hyprland-0-48-0-is-now-available',
    content: `
      <p>We're excited to announce the release of Hyprland 0.48.0, packed with new features and improvements.</p>
      <h2>What's New</h2>
      <ul>
        <li>Enhanced performance for multi-monitor setups</li>
        <li>Improved gesture support</li>
        <li>New animation options</li>
        <li>Extended plugin API</li>
      </ul>
      <p>This release represents a significant step forward in our journey to create the best tiling window manager experience.</p>
    `
  },
  {
    id: '2',
    date: 'January 27, 2025',
    title: 'Hyprland 0.47.0 has arrived!',
    slug: 'hyprland-0-47-0-has-arrived',
    content: `
      <p>Hyprland 0.47.0 brings several highly requested features and stability improvements.</p>
      <h2>Highlights</h2>
      <ul>
        <li>New workspace management features</li>
        <li>Improved configuration options</li>
        <li>Better compatibility with various hardware</li>
        <li>Reduced memory footprint</li>
      </ul>
      <p>We've also fixed numerous bugs and improved documentation.</p>
    `
  },
  {
    id: '3',
    date: 'December 17, 2024',
    title: 'Hyprland 0.46.0 is upon us!',
    slug: 'hyprland-0-46-0-is-upon-us',
    content: `
      <p>We're thrilled to announce the release of Hyprland 0.46.0.</p>
      <h2>What's New</h2>
      <ul>
        <li>Completely redesigned animation system</li>
        <li>New plugin system for developers</li>
        <li>Improved HiDPI support</li>
        <li>Better integration with various desktop environments</li>
      </ul>
      <p>This release lays the groundwork for many exciting features coming in future versions.</p>
    `
  }
];

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default function NewsArticle({ params }: { params: { slug: string } }) {
  const newsItem = newsItems.find(item => item.slug === params.slug);
  
  if (!newsItem) {
    return (
      <main className="container mx-auto pt-24 pb-16 px-4 max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Article not found</h1>
          <Link 
            href="/news"
            className="text-[var(--accent-color)] flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to News</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto pt-24 pb-16 px-4 max-w-3xl">
      <Link 
        href="/news"
        className="text-[var(--accent-color)] flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to News</span>
      </Link>
      
      <article>
        <div className="mb-8">
          <p className="text-[var(--text-secondary)]">{newsItem.date}</p>
          <h1 className="text-4xl font-bold mt-2">{newsItem.title}</h1>
        </div>
        
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </article>
    </main>
  );
} 