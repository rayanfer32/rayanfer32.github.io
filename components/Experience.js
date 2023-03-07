import userData from "@constants/data";
import React from "react";

export default function Experience({ showEducation = true }) {
  return (
    <section className="bg-white dark:bg-gray-800 mb-4">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
          Experience
        </h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4">
        <CreateCards data={userData.experience} pingColor="green" />
        {showEducation && (
          <>
            <div className="max-w-6xl mx-auto h-20">
              <h1 className=" text-3xl md:text-5xl font-bold py-10 text-center md:text-left">
                Education
              </h1>
            </div>
            <CreateCards data={userData.education} pingColor="blue" />
          </>
        )}
      </div>
    </section>
  );
}

function CreateCards({ data, pingColor }) {
  return (
    <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-20">
      {data.map((exp, idx) => (
        <React.Fragment key={exp.title}>
          <ExperienceCard
            key={idx}
            title={exp.title}
            desc={exp.desc}
            year={exp.year}
            company={exp.company}
            companyLink={exp.companyLink}
          />
          {idx === userData.experience.length - 1 ? null : (
            <div className="divider-container flex flex-col items-center -mt-2">
              <div
                className={`w-4 h-4 bg-${pingColor}-500 rounded-full relative z-10`}
              >
                <div
                  className={`w-4 h-4 animate-ping bg-${pingColor}-500 rounded-full relative z-10 `}
                ></div>
              </div>
              <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const ExperienceCard = ({ title, desc, year, company, companyLink }) => {
  return (
    <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4">
      <h1 className="absolute -top-10 md:-left-10 md:-top-10 text-4xl text-zinc-300 font-bold dark:text-gray-500">
        {year}
      </h1>
      <h1 className="font-semibold text-xl">{title}</h1>
      <a href={companyLink} className="text-gray-500">
        {company}
      </a>
      <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
    </div>
  );
};
