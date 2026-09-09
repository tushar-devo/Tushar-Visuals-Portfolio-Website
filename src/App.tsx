import React, { useState, useEffect } from 'react';
import { PageView, Project } from './types';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { HireMeModal } from './components/HireMeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hireModalOpen, setHireModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Scroll spy to update active navigation as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections: { id: string; page: PageView }[] = [
        { id: 'contact', page: 'contact' },
        { id: 'resume', page: 'resume' },
        { id: 'about', page: 'about' },
        { id: 'services', page: 'services' },
        { id: 'portfolio', page: 'portfolio' },
        { id: 'hero', page: 'home' },
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActivePage(section.page);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageView, sectionId?: string) => {
    setActivePage(page);
    if (page === 'hire') {
      setHireModalOpen(true);
      return;
    }
    const targetId = sectionId || (page === 'home' ? 'hero' : page);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenHireModal = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setHireModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF2A2A] selection:text-white font-sans antialiased relative">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Persistent Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenHireModal={() => handleOpenHireModal()}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* 1. Immersive 3D Hero */}
        <Hero
          onViewWork={() => handleNavigate('portfolio', 'portfolio')}
          onHireMe={() => handleOpenHireModal()}
        />

        {/* 2. Selected Work / Curated Gallery */}
        <Portfolio
          onSelectProject={(p) => setSelectedProject(p)}
          onOpenHireModal={() => handleOpenHireModal()}
        />

        {/* 3. Services: What I Can Build For You */}
        <ServicesSection onOpenHireModal={handleOpenHireModal} />

        {/* 4. Creative Process: From Idea to Impact */}
        <ProcessSection />

        {/* 5. Editorial About: Philosophy & Thinking */}
        <AboutSection
          onOpenHireModal={() => handleOpenHireModal()}
          onOpenResume={() => handleNavigate('resume', 'resume')}
        />

        {/* 6. Skills & Technical Stack */}
        <SkillsSection />

        {/* 7. Why Work With Tushar Visuals */}
        <WhyWorkWithMe onOpenHireModal={() => handleOpenHireModal()} />

        {/* 8. Client Testimonials */}
        <TestimonialsSection />

        {/* 9. Professional Resume & Credentials */}
        <ResumeSection onOpenHireModal={() => handleOpenHireModal()} />

        {/* 10. Contact / Collaboration */}
        <ContactSection />
      </main>

      {/* Oversized Studio Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenHireModal={() => handleOpenHireModal()}
      />

      {/* Case Study Full View Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenHireModal={() => {
          setSelectedProject(null);
          handleOpenHireModal(selectedProject?.title);
        }}
      />

      {/* Dedicated Hire Me Modal Inquiry Form */}
      <HireMeModal
        isOpen={hireModalOpen}
        onClose={() => {
          setHireModalOpen(false);
          setPreselectedService(undefined);
        }}
        preselectedService={preselectedService}
      />
    </div>
  );
}
