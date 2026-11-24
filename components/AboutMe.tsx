import React, { useState } from "react";
import userData from "@constants/data";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const TECH_SKILLS = [
  { name: "React", icon: "/assets/techstack/react.svg" },
  { name: "React Native", icon: "/assets/techstack/react.svg" },
  { name: "Next.js", icon: "/assets/techstack/nextjs-icon.svg" },
  { name: "TypeScript", icon: "/assets/techstack/typescript-icon.svg" },
  { name: "JavaScript", icon: "/assets/techstack/javascript.svg" },
  { name: "Node.js", icon: "/assets/techstack/nodejs.png" },
  { name: "Python", icon: "/assets/techstack/python.svg" },
  { name: "PostgreSQL", icon: "/assets/techstack/supabase.com.png" },
  { name: "Tailwind CSS", icon: "/assets/techstack/tailwindcss-icon.svg" },
  { name: "Redux", icon: "/assets/techstack/redux.svg" },
  { name: "Cloudflare", icon: "/assets/techstack/cloudflare.svg" },
  { name: "Docker", icon: "/assets/techstack/docker.png" },
  { name: "Linux", icon: "/assets/techstack/linux.png" },
  { name: "Firebase", icon: "/assets/techstack/firebase.png" },
  { name: "MySQL", icon: "/assets/techstack/mysql.png" },
  { name: "Vercel", icon: "/assets/techstack/vercel-logo.svg" },
  { name: "Git", icon: "/assets/techstack/git.png" },
  { name: "Svelte", icon: "/assets/techstack/svelte-icon.svg" },
  { name: "shadcn/ui", icon: "/assets/techstack/ui.shadcn.com.png" },
  { name: "HTML5", icon: "/assets/techstack/html.png" },
  { name: "CSS3", icon: "/assets/techstack/css.png" },
  { name: "Sass", icon: "/assets/techstack/sass.svg" },
  { name: "Bootstrap", icon: "/assets/techstack/bootstrap.svg" },
  { name: "Ollama (LLMs)", icon: "/assets/techstack/ollama.com.png" },
  { name: "v0.dev", icon: "/assets/techstack/v0.dev.png" },
  { name: "Figma", icon: "/assets/techstack/figma.svg" },
  { name: "Framer", icon: "/assets/techstack/framer.com.png" },
  { name: "Postman", icon: "/assets/techstack/postman.com.png" },
  { name: "VS Code", icon: "/assets/techstack/visual-studio-code.png" },
  { name: "Vite", icon: "/assets/techstack/vite.svg" },
  { name: "Webpack", icon: "/assets/techstack/webpack.png" },
  { name: "Nginx", icon: "/assets/techstack/nginx-icon.svg" },
  { name: "Strapi CMS", icon: "/assets/techstack/strapi.svg" },
  { name: "PM2", icon: "/assets/techstack/pm2.svg" },
  { name: "Jest", icon: "/assets/techstack/jest.svg" },
  { name: "ESLint", icon: "/assets/techstack/eslint.png" },
  { name: "NPM", icon: "/assets/techstack/npm.png" },
  { name: "Terminal / Bash", icon: "/assets/techstack/terminal.png" },
  { name: "Telegram Bot API", icon: "/assets/techstack/telegram.png" },
  { name: "Raspberry Pi", icon: "/assets/techstack/raspberry-pi.png" },
  { name: "Arduino", icon: "/assets/techstack/arduino.png" },
];

export default function AboutMe() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white dark:bg-gray-800">
      {/* 1. Header Section */}
      <div className="max-w-6xl mx-auto py-18 h-42 px-4 bg-white dark:bg-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-9xl font-bold text-center md:text-left text-gray-900 dark:text-gray-100"
        >
          About Me.
        </motion.h1>
      </div>

      {/* 2. Main Content Section */}
      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Subtitle / Intro Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-200/60 dark:border-gray-700/60">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="leading-relaxed text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100"
            >
              {userData.about.title}.
              <a
                className="bg-red-500 hidden rounded-md px-2 py-1 text-white ml-2 text-base align-middle"
                href={userData.about.currentProjectUrl}
              >
                {userData.about.currentProject} ✈️
              </a>
            </motion.p>

            {/* Tech Stack Icons placed directly under the subtitle */}
            <div className="mt-8 pt-8 border-t border-gray-200/60 dark:border-gray-700/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-teal-600 dark:text-teal-400">
                  Technologies & Tools
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {hoveredSkill ? (
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {hoveredSkill}
                    </span>
                  ) : (
                    "Hover to inspect"
                  )}
                </span>
              </div>

              {/* Polished responsive icon wrap with hover zoom & tooltip */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap items-center gap-3 md:gap-3.5"
              >
                {TECH_SKILLS.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.25,
                        y: -4,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        },
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="relative cursor-pointer p-2 rounded-xl bg-white dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/70 shadow-sm hover:shadow-lg hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-200 flex items-center justify-center group"
                    >
                      {/* Animated Tooltip on hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.85 }}
                            animate={{ opacity: 1, y: -4, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.85 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-9 whitespace-nowrap px-2.5 py-0.5 bg-gray-900/95 dark:bg-white text-white dark:text-gray-900 text-[11px] font-bold rounded-full shadow-xl pointer-events-none z-50 border border-white/20 dark:border-gray-800/20"
                          >
                            {skill.name}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative w-8 h-8 md:w-9 md:h-9">
                        <Image
                          alt={skill.name}
                          src={skill.icon}
                          fill
                          sizes="36px"
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Details Grid: Left Column (Contact & Links) & Right Column (Story) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left Column (Contact, Opportunities, Socials) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-200/60 dark:border-gray-700/60 flex flex-col justify-between"
            >
              <div>
                <motion.div variants={itemVariants}>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Contact
                  </h1>
                  <p className="text-base text-gray-600 mt-3 dark:text-gray-300 leading-relaxed">
                    For any sort help / enquiry, shoot a{" "}
                    <a
                      href={`mailto:${userData.email}`}
                      className="text-gray-900 border-b-2 border-gray-900 dark:border-gray-100 font-bold dark:text-gray-100"
                    >
                      mail
                    </a>{" "}
                    and I&apos;ll get back. I swear.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Job Opportunities
                  </h1>
                  <p className="text-base text-gray-600 mt-3 dark:text-gray-300 leading-relaxed">
                    I&apos;m looking for a job currently, If you see me as a good
                    fit, check my{" "}
                    <Link
                      href={userData.resumeUrl}
                      className="text-gray-900 border-b-2 border-gray-900 dark:border-gray-100 font-bold dark:text-gray-100"
                    >
                      CV{" "}
                    </Link>
                    and I&apos;d love to work for you.
                  </p>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <motion.h1
                  variants={itemVariants}
                  className="text-xl font-bold text-gray-800 dark:text-gray-100"
                >
                  Social Links
                </motion.h1>
                <div className="mt-4 space-y-2">
                  {Object.entries(userData.socialLinks).map(
                    ([title, link], index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex flex-row justify-start items-center"
                      >
                        <a
                          href={link}
                          className="flex flex-row items-center space-x-3 group"
                        >
                          <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                            &rarr;
                          </span>
                          <span className="text-base text-gray-600 font-mono dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {title}
                          </span>
                        </a>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Experience & Story */}
            <div className="col-span-1 md:col-span-2 p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-200/60 dark:border-gray-700/60">
              {userData.about.description?.map((desc, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-lg text-gray-700 mb-6 last:mb-0 leading-relaxed dark:text-gray-300"
                >
                  {desc}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
