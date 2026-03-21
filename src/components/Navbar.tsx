import { motion } from "motion/react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Work", "Skills", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div
          className={`glass rounded-full px-6 py-2 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "shadow-lg" : "shadow-none"
          }`}
        >
          <a href="#" className="text-xl font-bold tracking-tighter">
            Nakib<span className="text-apple-blue">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-apple-text/70 hover:text-apple-text transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-apple-text text-white text-xs font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
