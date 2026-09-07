import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Principles from "@/components/Principles";
import ArchitectureExplorer from "@/components/Architecture";
import Section from "@/components/Section";
import GitHubSection from "@/components/GitHub";
import KnowledgeSharing from "@/components/KnowledgeSharing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <span id="top" />

      <Hero />
      <Impact />
      <About />
      <Expertise />
      <Experience />
      <Projects />
      <Principles />

      <Section
        id="architecture"
        kicker="07 / How I build"
        title="How I think about systems."
        lead="This is the shape most of what I build takes. It is not a template I apply by default — it is the arrangement I keep arriving at, and every layer below earns its place."
      >
        <ArchitectureExplorer />
      </Section>

      <GitHubSection />
      <KnowledgeSharing />
      <Contact />
    </>
  );
}
