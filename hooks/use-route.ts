import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(() => {
    if (pathname === '/blog') return 'blog';
    if (pathname === '/news' || pathname.startsWith('/news/')) return 'news';
    return pathname === '/' ? 'hero' : pathname.slice(1);
  });

  const handleRouteChange = (path: string) => {
    const sectionId = path === '/' ? 'hero' : path.slice(1);
    setActiveSection(sectionId);
    
    // Handle blog and news page navigation
    if (path === '/blog' || path === '/news') {
      router.push(path);
      return;
    }
    
    // Navigate from blog/news to section
    if (pathname === '/blog' || pathname === '/news' || pathname.startsWith('/news/')) {
      // First navigate to home page
      router.push('/');
      
      // Wait a moment for navigation to complete, then scroll
      setTimeout(() => {
        if (sectionId === 'hero') {
          window.scrollTo({ top: 0 });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState({}, '', path);
          }
        }
      }, 100);
      return;
    }

    // Regular section navigation
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState({}, '', '/');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', path);
      }
    }
  };

  // Update active section when pathname changes
  useEffect(() => {
    if (pathname === '/blog') {
      setActiveSection('blog');
    } else if (pathname === '/news' || pathname.startsWith('/news/')) {
      setActiveSection('news');
    }
  }, [pathname]);
  
  // Handle scroll-based section updates
  useEffect(() => {
    if (!pathname.includes('/blog') && !pathname.includes('/news')) {
      const handleScroll = () => {
        const sections = ['hero', 'features', 'pricing', 'faq'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      };
      
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  return {
    handleRouteChange,
    activeSection,
    currentPath: pathname
  };
}; 
