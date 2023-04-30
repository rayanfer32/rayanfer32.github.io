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
  offscreen: {
    y: 300,
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function FramerAnimtionDiv({ children }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div variants={framerVariants}>{children}</motion.div>
    </motion.div>
  );
}

export default function Home({ repositories }) {
  return (
    <ContainerBlock title={userData.name} description={userData.description}>
      <Hero />
      <FavouriteProjects />
      <AboutMe />
      <Experience showEducation={false} />
      <LatestCode repositories={repositories} />
      <Contact />
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
