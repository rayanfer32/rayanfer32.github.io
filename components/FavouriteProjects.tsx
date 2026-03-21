import React from "react";
import Link from "next/link";
import userData from "@constants/data";
import { motion } from "framer-motion";

export default function FavouriteProjects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#F1F1F1] -mt-40 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center pt-40 mx-10 md:my-20 lg:my-0">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl lg:text-9xl max-w-lg font-bold text-gray-500 my-20 md:my-0 md:text-white dark:text-gray-600 text-center"
          >
            Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="mb-20 md:mb-0 px-8 py-4 rounded-md shadow-lg text-xl font-semibold flex flex-row space-x-4 items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-up-right-square"
                stroke="4"
                strokeWidth="4"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                />
              </svg>
              <p>View all</p>
            </Link>
          </motion.div>
        </header>

        {/* Grid starts here */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-8 lg:-mt-8 pb-40"
        >
          {userData.projects.slice(0, 5).map((project, index) => {
            return (
              <motion.a
                key={project.title}
                variants={item}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="w-full block col-span-3 shadow-2xl relative group overflow-hidden"
                href={project.link}
                target="_blank"
              >
                <h1 className="text-gray-100 text-xl bg-zinc-800 p-4 relative z-10">
                  {project.title}
                </h1>
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.imgUrl}
                    alt="portfolio"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full object-cover"
                  />

                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 text-white p-10 text-center text-xl transition-opacity duration-300"
                  >
                    {project.desc}
                  </motion.div>
                  <h1 className="absolute bottom-6 left-10 text-gray-50 font-bold text-xl">
                    {index + 1}
                  </h1>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
