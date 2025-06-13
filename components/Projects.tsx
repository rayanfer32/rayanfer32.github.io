import PropTypes from "prop-types"
import React from "react";
import userData from "@constants/data";

export default function Projects() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
          Projects
        </h1>
      </div>
      {/* Grid starts here */}
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 pb-40">
          {userData.projects.map((proj, idx) => (
            <ProjectCard
              key={proj.title}
              title={proj.title}
              link={proj.link}
              imgUrl={proj.imgUrl}
              number={`${idx + 1}`}
              desc={proj.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, link, desc, imgUrl, number }) => {
  return (
    <div>
      <a href={link} className="w-full block shadow-2xl">
        <div className="relative overflow-hidden">
          <h1 className="text-gray-50 text-xl bg-zinc-700 p-3">{title}</h1>
          <div className="h-72 object-cover">
            <img
              src={imgUrl}
              alt="portfolio"
              className="transform hover:scale-[1.35] transition duration-2000 ease-out object-cover h-full w-full"
            />
          </div>

          <h1 className="absolute bottom-10 left-10 text-gray-50 font-bold text-xl">
            {number.length === 1 ? "0" + number : number}
          </h1>
        </div>
        <h1 className="text-gray-50 text-l text-center bg-gray-600 p-2">
          {desc}
        </h1>
      </a>
    </div>
  );
};

ProjectCard.propTypes = {
  desc: PropTypes.any,
  imgUrl: PropTypes.any,
  link: PropTypes.any,
  number: PropTypes.shape({
    length: PropTypes.number
  }),
  title: PropTypes.any
}
