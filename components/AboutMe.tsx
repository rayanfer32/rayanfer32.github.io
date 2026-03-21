import React from "react";
import userData from "@constants/data";
import { getMyTechStackIcons } from "@utils/helper";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" text-5xl md:text-9xl font-bold py-16 text-center md:text-left"
        >
          About Me.
        </motion.h1>
      </div>
      <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
        <div className="text-container  max-w-6xl mx-auto pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="leading-loose text-2xl md:text-4xl font-semibold  mx-4"
            style={{ lineHeight: "3rem" }}
          >
            {userData.about.title}.
            <a
              className="bg-red-500 hidden rounded-md px-2 py-1 text-white"
              href={userData.about.currentProjectUrl}
            >
              {userData.about.currentProject} ✈️
            </a>
          </motion.p>
        </div>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4">
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
          {/* Social Buttons */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex flex-col"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Contact
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                For any sort help / enquiry, shoot a{" "}
                <a
                  href={`mailto:${userData.email}`}
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  mail
                </a>{" "}
                and I&apos;ll get back. I swear.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-8">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Job Opportunities
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                I&apos;m looking for a job currently, If you see me as a good
                fit, check my{" "}
                <Link
                  href={userData.resumeUrl}
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  CV{" "}
                </Link>
                and I&apos;d love to work for you.
              </p>
            </motion.div>
            {/* Social Links */}
            <motion.h1 variants={itemVariants} className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
              Social Links
            </motion.h1>
            <div className="mt-4 ml-4">
              {Object.entries(userData.socialLinks).map(
                ([title, link], index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-row justify-start items-center "
                  >
                    <a
                      href={link}
                      className="flex flex-row items-center space-x-4 group"
                    >
                      <div className="my-4">&rarr;</div>
                      <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                        {title}
                      </div>
                    </a>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
          {/* Text area */}
          <div className="col-span-1 md:col-span-2">
            {userData.about.description?.map((desc, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
              >
                {desc}
              </motion.p>
            ))}

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-teal-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50"
            >
              Tech Stack
            </motion.h1>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-row flex-wrap mt-8 transition-all duration-1000 ease-initial"
            >
              {getMyTechStackIcons().map((src) => (
                <motion.div
                  key={src}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="mx-4 my-4"
                >
                  <Image
                    alt={src}
                    width={128}
                    height={128}
                    src={src}
                    className="h-20 w-20"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
