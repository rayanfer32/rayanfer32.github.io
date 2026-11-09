import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import userData from "@constants/data";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const meta: Partial<typeof userData.meta> = {
    ...userData.meta,
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://yourwebsite.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://yourwebsite.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.site_name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mannupaaji" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-500 origin-left z-50 rounded-r-full"
        style={{ scaleX }}
      />
      <main className="relative min-h-screen w-full bg-slate-50/60 dark:bg-[#090d16] transition-colors">
        {/* Subtle decorative grid lines across the entire website */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.045] z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient modern gradient glow across the website */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-30 dark:opacity-20 blur-3xl z-0"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(20, 184, 166, 0.35), rgba(99, 102, 241, 0.2), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col min-h-screen justify-between">
          <div>
            <Navbar />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
