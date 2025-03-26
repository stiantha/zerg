import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Sample news data
const newsItems = [
  {
    id: '1',
    date: 'March 23, 2025',
    title: 'ZERG 0.2.0 is now available!',
    slug: 'hyprland-0-48-0-is-now-available'
  },
  {
    id: '2',
    date: 'January 27, 2025',
    title: 'ZERG 0.1.1 has arrived!',
    slug: 'hyprland-0-47-0-has-arrived'
  },
  {
    id: '3',
    date: 'December 17, 2024',
    title: 'ZERG 0.1.0 is upon us!',
    slug: 'hyprland-0-46-0-is-upon-us'
  }
];

export default function NewsPage() {
  return (
    <main className="container mx-auto pt-24 pb-16 px-4 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4">News</h1>
        <p className="text-[var(--text-secondary)] text-xl">Fresh updates straight from the oven</p>
      </div>

      <div className="flex flex-col space-y-6">
        {newsItems.map((item) => (
          <Link 
            href={`/news/${item.slug}`} 
            key={item.id}
            className="bg-[rgba(10,20,30,0.5)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-xl p-6 transition-all hover:bg-[rgba(15,25,35,0.6)] hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-[var(--text-secondary)]">{item.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}