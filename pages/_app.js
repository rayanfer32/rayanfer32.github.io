import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -100,
  },
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider defaultTheme="light" attribute="class">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
          >
            <Component key={router.asPath} {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-HWCHKD0MJQ`}
      />
      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HWCHKD0MJQ');
        `}
      </Script>
    </>
  );
}
