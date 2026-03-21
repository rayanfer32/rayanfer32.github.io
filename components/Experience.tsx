import userData from "@constants/data";
import { getFaviconIcon } from "@utils/helper";
import React from "react";
import { motion } from "framer-motion";

export default function Experience({ showEducation = true }) {
  return (
    <section className="bg-white dark:bg-gray-800 mb-4">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left"
        >
          Experience
        </motion.h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4">
        <CreateCards data={userData.experience} />
        {showEducation && (
          <>
            <div className="max-w-6xl mx-auto h-20">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className=" text-3xl md:text-5xl font-bold py-10 text-center md:text-left"
              >
                Education
              </motion.h1>
            </div>
            <CreateCards data={userData.education} />
          </>
        )}
      </div>
    </section>
  );
}

function CreateCards({ data }) {
  return (
    <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-20">
      {data.map((exp, idx) => (
        <React.Fragment key={exp.title + idx}>
          <ExperienceCard
            key={idx}
            title={exp.title}
            desc={exp.desc}
            year={exp.year}
            company={exp.company}
            companyLink={exp.companyLink}
            icon={getFaviconIcon(exp.icon)}
          />
          {idx === data.length - 1 ? null : (
            <div className="divider-container flex flex-col items-center -mt-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className={`w-4 h-4 bg-blue-500 rounded-full relative z-10`}
              >
                <div
                  className={`w-4 h-4 animate-ping bg-blue-400 rounded-full relative z-10 `}
                ></div>
              </motion.div>
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-1 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"
              ></motion.div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const ExperienceCard = ({ title, desc, year, company, companyLink, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4"
    >
      <motion.h1 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute -top-10 md:-left-10 md:-top-10 text-4xl text-zinc-300 font-bold dark:text-gray-500"
      >
        {year}
      </motion.h1>

      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-xl">{title}</h1>

          <a href={companyLink} className="text-gray-500">
            {company}
          </a>
        </div>
        <img className="w-8 h-8 rounded-full" src={icon}></img>
      </div>

      <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
    </motion.div>
  );
};
