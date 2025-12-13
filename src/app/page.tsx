import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/shared/Hero';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load components that are below the fold
const About = lazy(() => import('@/components/shared/About'));
const Projects = lazy(() => import('@/components/shared/Projects'));
const TechStack = lazy(() => import('@/components/shared/TechStack'));
const Experience = lazy(() => import('@/components/shared/Experience'));
const Contact = lazy(() => import('@/components/shared/Contact'));
const FavoritePlaylist = lazy(() => import('@/components/shared/FavoritePlaylist'));
const Footer = lazy(() => import('@/components/shared/Footer'));

// Loading fallback component
const SectionLoader = () => (
  <section className="py-20 flex justify-center items-center min-h-[400px]">
    <LoadingSpinner />
  </section>
);

export default function Home() {
  return (
    <main className="relative bg-zinc-950 text-zinc-100" role="main">
      <Navbar />
      <Hero />
      
      {/* Lazy loaded sections with loading states */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TechStack />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FavoritePlaylist />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
}