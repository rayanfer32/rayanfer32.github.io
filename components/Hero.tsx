import React, { useEffect, useState } from "react";
import userData from "@constants/data";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaMediumM,
  FaInstagram,
} from "react-icons/fa";

export default function Hero() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20 md:py-28 max-w-4xl mx-auto">
      {/* Centered Avatar with Swag Shades animation & Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative inline-block mb-6 sm:mb-8"
      >
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 mx-auto">
          <img
            src={userData.avatarUrl}
            alt={userData.name}
            className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white dark:border-zinc-800 ring-2 ring-teal-500/20 transition-transform duration-500 hover:scale-105"
          />
          <AnimatePresence>
            {mounted && theme === "light" && (
              <>
                <motion.img
                  src="/swag-shades.png"
                  alt="swag shades"
                  initial={{ x: 100, y: -20, opacity: 0, rotate: 10 }}
                  animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  exit={{ x: 100, y: -20, opacity: 0, rotate: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.4,
                  }}
                  className="absolute w-24 sm:w-28 md:w-26 top-[18%] left-[49%] rotate-[6deg] -translate-x-1/2 pointer-events-none drop-shadow-md z-20"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 8 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    delay: 0.75,
                  }}
                  onClick={() => setTheme("dark")}
                  title="Click to turn down the light"
                  className="absolute -top-14 sm:-top-12 left-1/2 -translate-x-1/2 sm:left-[60%] sm:translate-x-0 z-30 cursor-pointer select-none"
                >
                  <div className="relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/95 text-zinc-800 text-xs sm:text-sm font-medium shadow-xl border border-zinc-200/90 hover:scale-105 hover:bg-zinc-50 transition-all flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-amber-500">🕶️</span>
                    <span>Ouch my eyes!!, can you please turn down the light ?</span>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 w-3 h-3 bg-white rotate-45 border-b border-r border-zinc-200/90 pointer-events-none" />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight"
      >
        {userData.name}
      </motion.h1>

      {/* Designation */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
      >
        {userData.designation}
      </motion.p>

      {/* Punchy 1-2 line intro */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-normal"
      >
        Building fast, scalable full-stack applications with delightful user experiences. Passionate about modern web technologies, AI tools, and clean engineering.
      </motion.p>

      {/* Social / Profile Links */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
      >
        <a
          href={userData.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:shadow-md hover:scale-110 transition-all"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href={userData.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:shadow-md hover:scale-110 transition-all"
        >
          <FaLinkedinIn className="w-5 h-5" />
        </a>
        <a
          href={userData.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:shadow-md hover:scale-110 transition-all"
        >
          <FaTwitter className="w-5 h-5" />
        </a>
        <a
          href={userData.socialLinks.medium}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Medium"
          className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:shadow-md hover:scale-110 transition-all"
        >
          <FaMediumM className="w-5 h-5" />
        </a>
        <a
          href={userData.socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:shadow-md hover:scale-110 transition-all"
        >
          <FaInstagram className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
}
