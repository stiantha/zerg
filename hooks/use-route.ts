import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useRoute = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteChange = (path: string) => {
    // Special case for home
    if (path === '/') {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Special case for blog (actual page navigation)
    if (path === '/blog') {
      router.push(path);
      return;
    }

    // For section navigation
    const sectionId = path.slice(1); // Remove leading slash
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', path);
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const sectionId = path.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    handleRouteChange,
    currentPath: pathname
  };
}; 