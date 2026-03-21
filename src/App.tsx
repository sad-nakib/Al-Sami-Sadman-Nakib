import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ProjectCard } from "./components/ProjectCard";
import { ArrowRight, Mail, Linkedin, Twitter, Github, Facebook, Send } from "lucide-react";

const PROJECTS = [
  {
    title: "Skycast",
    category: "API Integration & Product Design",
    description: "A high-performance weather application featuring real-time data integration and a minimal, intuitive user interface.",
    link: "https://skycast-o3.netlify.app/",
  },
  {
    title: "Lumina Design System",
    category: "Product Design",
    description: "A comprehensive design system built for high-scale SaaS platforms, focusing on accessibility and modularity.",
    link: "#",
  },
  {
    title: "Ethereal Mobile",
    category: "iOS Development",
    description: "A meditation app designed with a focus on calm interactions and fluid gesture-based navigation.",
    link: "#",
  },
  {
    title: "Arcane Analytics",
    category: "Web Application",
    description: "Real-time data visualization platform for crypto assets with high-performance rendering.",
    link: "#",
  },
  {
    title: "Nexus AI",
    category: "AI Integration",
    description: "An intelligent assistant that automates complex workflows using large language models.",
    link: "#",
  },
];

const SKILLS = [
  "Product Design",
  "Prompt Engineering",
  "AI Product Generation",
  "API Integration",
  "Website Setup",
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewHeight = window.innerHeight;
      
      // Start progress when the section top reaches the top of the viewport
      // We want it to reach 100% slightly before the section ends to give a "stay" effect
      const scrollableDistance = sectionHeight - viewHeight * 1.2;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      
      const index = Math.round(progress * (SKILLS.length - 1));
      setActiveIndex(index);
      setRotation(progress * 360);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative bg-white h-[400vh]">
      {/* Static Heading */}
      <div className="sticky top-20 left-0 w-full text-center z-30 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Skills</h2>
        <p className="text-lg text-apple-text/60">Engineered for precision and performance.</p>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="max-w-screen-xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-center gap-32 md:gap-64">
          
          {/* 3D Knob Visual */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-black/5 blur-3xl transform scale-125" />
            
            <motion.div 
              style={{ rotateZ: rotation }}
              className="w-full h-full rounded-full relative shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
            >
              {/* Knob Body with Depth */}
              <div className="absolute inset-0 rounded-full bg-[#E8E8ED] border-b-[12px] border-black/10" />
              
              {/* Top Surface with Brushed Metal Effect */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#F5F5F7] to-[#D2D2D7] shadow-lg flex items-center justify-center">
                {/* Inner Ring */}
                <div className="w-1/2 h-1/2 rounded-full border border-black/5 bg-[#F5F5F7] shadow-inner flex items-center justify-center">
                  <div className="w-4 h-4 bg-apple-blue rounded-full shadow-[0_0_20px_rgba(0,113,227,0.4)]" />
                </div>
              </div>
              
              {/* Indicator Line */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2.5 h-12 bg-black rounded-full shadow-md" />
              
              {/* Mechanical Ticks - Centered correctly */}
              {[...Array(36)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute left-1/2 top-1/2 w-0.5 rounded-full ${i % 3 === 0 ? "h-6 bg-black/40" : "h-4 bg-black/15"}`}
                  style={{ 
                    transform: `translate(-50%, -50%) rotate(${i * 10}deg) translateY(-145px)`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Static Skill Text */}
          <div className="relative flex flex-col items-center md:items-start justify-center min-w-[350px] h-[150px]">
            {SKILLS.map((skill, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={skill}
                  initial={false}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                    filter: isActive ? "blur(0px)" : "blur(10px)",
                    x: isActive ? 0 : -20,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 text-center md:text-left whitespace-nowrap ${isActive ? "z-10" : "z-0 pointer-events-none"}`}
                >
                  <span className="text-[7vw] md:text-[5vw] font-bold uppercase tracking-tighter text-black leading-none">
                    {skill}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default function App() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div className="min-h-screen selection:bg-apple-blue selection:text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-white">
          <div className="max-w-screen-xl mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-balance">
                Crafting Digital <br />
                <span className="text-apple-silver">Experiences.</span>
              </h1>
              <p className="text-lg md:text-2xl text-apple-text/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                I design and build high-end digital products with a focus on 
                minimalism, performance, and human-centric interaction.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="#work"
                  className="group bg-apple-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#about"
                  className="text-lg font-semibold text-apple-text hover:opacity-60 transition-opacity"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>

          {/* Subtle Background Element */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-40 px-6 bg-apple-bg">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                  Design. Intelligence. Systems.
                </h2>
                <div className="space-y-6 text-lg text-apple-text/70 leading-relaxed">
                  <p>
                    I build AI-powered digital products with precision and intent.
                  </p>
                  <p>
                    From product design to intelligent automation, I craft experiences that are structured, scalable, and thoughtfully engineered.
                  </p>
                  <p className="font-semibold text-apple-text">
                    Modern tools. Clean execution. Future-focused thinking.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm border border-black/5"
              >
                <h3 className="text-xl font-bold mb-8">My Philosophy</h3>
                <ul className="space-y-8">
                  <li className="flex gap-6">
                    <span className="text-apple-blue font-bold text-lg">01</span>
                    <div>
                      <h4 className="font-bold mb-2">Simplicity First</h4>
                      <p className="text-apple-text/60 text-sm">Removing the unnecessary to let the essential shine.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-apple-blue font-bold text-lg">02</span>
                    <div>
                      <h4 className="font-bold mb-2">Performance Driven</h4>
                      <p className="text-apple-text/60 text-sm">Speed is a feature. I build for zero lag and instant response.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-apple-blue font-bold text-lg">03</span>
                    <div>
                      <h4 className="font-bold mb-2">Human Centered</h4>
                      <p className="text-apple-text/60 text-sm">Technology should adapt to people, not the other way around.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Work Section - Horizontal Scroll */}
        <section id="work" ref={targetRef} className="relative h-[300vh] bg-white">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="max-w-screen-xl mx-auto w-full px-6 mb-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Selected Work</h2>
              <p className="text-lg text-apple-text/60 max-w-md">
                A collection of projects that define my creative direction and technical capabilities.
              </p>
            </div>
            
            <motion.div style={{ x }} className="flex gap-8 px-6 md:px-[calc((100vw-1280px)/2)]">
              {PROJECTS.map((project, index) => (
                <div key={project.title} className="w-[85vw] md:w-[600px] flex-shrink-0">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Vertical Knob Selector */}
        <SkillsSection />

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-48 px-6 bg-white">
          <div className="max-w-screen-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">Let's build <br />something great.</h2>
              <p className="text-xl md:text-2xl text-apple-text/60 max-w-2xl mx-auto mb-16 leading-relaxed">
                I'm currently available for freelance projects and full-time opportunities. 
                If you have a project in mind, I'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a
                  href="mailto:sadman.nakib@yahoo.com"
                  className="bg-apple-text text-white px-10 py-5 rounded-full text-xl font-semibold hover:opacity-90 transition-all flex items-center gap-3 shadow-lg shadow-black/5"
                >
                  <Mail size={24} />
                  Email Me
                </a>
                <div className="flex items-center gap-4">
                  <a href="https://www.linkedin.com/in/al-sami-sadman-nakib-27b17b202" target="_blank" rel="noopener noreferrer" className="p-4 bg-apple-bg rounded-full hover:bg-black/5 transition-colors text-apple-text">
                    <Linkedin size={28} />
                  </a>
                  <a href="https://t.me/sadman_nakib" target="_blank" rel="noopener noreferrer" className="p-4 bg-apple-bg rounded-full hover:bg-black/5 transition-colors text-apple-text">
                    <Send size={28} />
                  </a>
                  <a href="https://twitter.com/SadmanNakib" target="_blank" rel="noopener noreferrer" className="p-4 bg-apple-bg rounded-full hover:bg-black/5 transition-colors text-apple-text">
                    <Twitter size={28} />
                  </a>
                  <a href="https://www.facebook.com/a.s.sadman.nakib" target="_blank" rel="noopener noreferrer" className="p-4 bg-apple-bg rounded-full hover:bg-black/5 transition-colors text-apple-text">
                    <Facebook size={28} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-apple-bg rounded-full hover:bg-black/5 transition-colors text-apple-text">
                    <Github size={28} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-black/5 bg-white">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-apple-silver text-sm font-medium">
            © {new Date().getFullYear()} Nakib. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-medium text-apple-silver hover:text-apple-text transition-colors">Privacy</a>
            <a href="#" className="text-sm font-medium text-apple-silver hover:text-apple-text transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
