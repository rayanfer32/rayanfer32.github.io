// import styles from "../styles/Home.module.css";
import React from "react";
import PropTypes from "prop-types";
import ContainerBlock from "../components/ContainerBlock";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import AboutMe from "@components/AboutMe";
import Experience from "@components/Experience";
import Contact from "@components/Contact";
import { env } from "process";
import { motion } from "framer-motion";

const framerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function MotionSection({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={framerVariants}
    >
      {children}
    </motion.div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 1 }}
      className="hidden lg:flex flex-col items-center gap-2 absolute bottom-2 left-1/2 -translate-x-1/2"
    >
      <span className="text-gray-400 dark:text-gray-500 text-sm font-light uppercase tracking-widest">
        Scroll Down
      </span>
      <div className="w-[30px] h-[50px] border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center p-1">
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[6px] h-[10px] bg-gray-400 dark:bg-gray-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function Home({ repositories }) {
  return (
    <ContainerBlock title={userData.name} description={userData.description}>
      <MotionSection>
        <Hero />
        <ScrollHint />
      </MotionSection>
      <MotionSection>
        <FavouriteProjects />
      </MotionSection>
      <MotionSection>
        <AboutMe />
      </MotionSection>
      <MotionSection>
        <Experience showEducation={false} />
      </MotionSection>
      <MotionSection>
        <LatestCode repositories={repositories} />
      </MotionSection>
      <MotionSection>
        <Contact />
      </MotionSection>
    </ContainerBlock>
  );
}

Home.propTypes = {
  repositories: PropTypes.any,
};

export const getServerSideProps = async () => {
  console.log(env.GITHUB_AUTH_TOKEN);
  let token = env.GITHUB_AUTH_TOKEN;

  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories: repositories || null,
    },
  };
};
