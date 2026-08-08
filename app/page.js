import { SiteNav } from "@/components/site/SiteNav.jsx";
import { ConsoleEgg } from "@/components/site/ConsoleEgg.jsx";
import { Hero } from "@/components/sections/Hero.jsx";
import { About } from "@/components/sections/About.jsx";
import { Experience } from "@/components/sections/Experience.jsx";
import { Projects } from "@/components/sections/Projects.jsx";
import { Skills } from "@/components/sections/Skills.jsx";
import { Favorites } from "@/components/sections/Favorites.jsx";
import { Contact } from "@/components/sections/Contact.jsx";
import { Footer } from "@/components/sections/Footer.jsx";

export default function Home() {
  return (
    <>
      <SiteNav />
      <ConsoleEgg />
      <main>
        <Hero />
        <Skills />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
